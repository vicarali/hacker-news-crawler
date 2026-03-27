import * as cheerio from 'cheerio';

import { HackerNewsItem } from '../services/common/hacker-news-types';

const HACKER_NEWS_URL = 'https://news.ycombinator.com';

async function getAll() {
  const response = await fetch(HACKER_NEWS_URL);
  if (!response.ok)
    throw new Error(
      `Failed to fetch Hacker News: ${response.status} ${response.statusText}`,
    );

  const html = await response.text();
  return scrapeHackerNews(html);
}

function scrapeHackerNews(html: string): HackerNewsItem[] {
  const $ = cheerio.load(html);
  const listingTable = $('#bigbox');
  const listingItems = $(listingTable).find('.submission');
  const hackerNews = listingItems.map((_, listingItem) => {
    const nextSiblingElement = $(listingItem).next();
    const subtext = $(nextSiblingElement).find('.subtext');

    return {
      rank: parseInt($(listingItem).find('.rank').text().slice(0, -1)),
      title: $(listingItem).find('.titleline > a').text(),
      score: parseInt($(subtext).find('.score').text().replace(' points', '')),
      totalComments: formatCommentsTotal(
        $(subtext).find('.subline > a:last-child').text(),
      ),
    };
  });

  return hackerNews.get();
}

function formatCommentsTotal(text: string): number {
  if (text === 'discuss') return 0;
  else
    return parseInt(
      text.replace(/[\u00A0\n\r\t ]+/g, '').replace('comments', ''), // remove whitespace and comments string
    );
}

export default { getAll };
