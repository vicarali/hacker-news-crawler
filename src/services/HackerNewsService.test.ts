import { beforeEach, describe, expect, it, vi } from 'vitest';

// Adjust path
import RequestRepo from '@src/repos/RequestRepo';

import HackerNewsService from './HackerNewsService';

// Mocking the dependencies
vi.mock('@src/repos/RequestRepo');
vi.mock('@src/common/utils/number-utils', () => ({
  getRandomInt: () => 123,
}));

describe('HackerNews Service', () => {
  const mockHtml = `
    <table id="bigbox">
      <tr class="submission">
        <td class="rank">1.</td>
        <td class="titleline"><a href="#">Short Title</a></td>
      </tr>
      <tr>
        <td class="subtext">
          <span class="score">100 points</span>
          <span class="subline"><a href="#">5 comments</a></span>
        </td>
      </tr>
      <tr class="submission">
        <td class="rank">2.</td>
        <td class="titleline"><a href="#">This is a very long title indeed</a></td>
      </tr>
      <tr>
        <td class="subtext">
          <span class="score">50 points</span>
          <span class="subline"><a href="#">discuss</a></span>
        </td>
      </tr>
    </table>
  `;

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  describe('getAll', () => {
    it('should fetch HTML, scrape items, and log the request', async () => {
      vi.mocked(fetch).mockResolvedValue(
        new Response(mockHtml, { status: 200 }),
      );

      const result = await HackerNewsService.getAll();

      expect(RequestRepo.add).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'all' }),
      );
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Short Title');
      expect(result[1].totalComments).toBe(0); // "discuss" maps to 0
    });

    it('should throw an error if fetch fails', async () => {
      vi.mocked(fetch).mockResolvedValue(new Response('', { status: 404 }));

      await expect(HackerNewsService.getAll()).rejects.toThrow(
        'Failed to fetch Hacker News',
      );
    });
  });

  describe('Filtering Logic', () => {
    beforeEach(() => {
      vi.spyOn(HackerNewsService, 'getAll').mockResolvedValue([
        { rank: 1, title: 'Short Title', score: 100, totalComments: 5 },
        {
          rank: 2,
          title: 'This is a very long title indeed',
          score: 50,
          totalComments: 20,
        },
      ]);
    });

    it('getEntriesWithMoreThanFiveWords should filter and sort by comments', async () => {
      const result = await HackerNewsService.getEntriesWithMoreThanFiveWords();

      expect(result).toHaveLength(1);
      expect(result[0].title).toContain('long title');
      expect(RequestRepo.add).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'moreThanFiveWords' }),
      );
    });

    it('getEntriesWithLessOrEqualToFiveWords should filter and sort by score', async () => {
      const result =
        await HackerNewsService.getEntriesWithLessOrEqualToFiveWords();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Short Title');
      expect(result[0].score).toBe(100);
      expect(RequestRepo.add).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'lessOrEqualToFiveWords' }),
      );
    });
  });
});
