import * as cheerio from 'cheerio';

import { getRandomInt } from '@src/common/utils/number-utils';
import { Request, RequestType } from '@src/models/Request.model';
import RequestRepo from '@src/repos/RequestRepo';

import { HackerNewsItem } from '../services/common/hacker-news-types';

const HACKER_NEWS_URL = 'https://news.ycombinator.com';

async function getAll(): Promise<HackerNewsItem[]> {
  await storeRequest('all');
  const response = await fetch(HACKER_NEWS_URL);
  if (!response.ok)
    throw new Error(
      `Failed to fetch Hacker News: ${response.status} ${response.statusText}`,
    );

  const html = await response.text();
  return scrapeHackerNews(html);
}

async function getEntriesWithMoreThanFiveWords(): Promise<HackerNewsItem[]> {
  await storeRequest('moreThanFiveWords');
  const hackerNews = await getAll();
  const filteredHackerNews = hackerNews.filter(
    (hackerNewsItem) => countWords(hackerNewsItem.title) > 5,
  );

  return filteredHackerNews.sort((a, b) => b.totalComments - a.totalComments);
}

async function getEntriesWithLessOrEqualToFiveWords(): Promise<
  HackerNewsItem[]
> {
  await storeRequest('lessOrEqualToFiveWords');
  const hackerNews = await getAll();
  const filteredHackerNews = hackerNews.filter(
    (hackerNewsItem) => countWords(hackerNewsItem.title) <= 5,
  );

  return filteredHackerNews.sort((a, b) => b.score - a.score);
}

async function storeRequest(requestType: RequestType): Promise<void> {
  const request: Request = {
    id: getRandomInt(),
    created: new Date(),
    type: requestType,
  };

  await RequestRepo.add(request);
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

function countWords(text: string): number {
  const textWithoutNonWordCharacters = text.replace(/[^a-zA-Z0-9\s]/g, '');
  return textWithoutNonWordCharacters.split(' ').length;
}

export default {
  getAll,
  getEntriesWithMoreThanFiveWords,
  getEntriesWithLessOrEqualToFiveWords,
};
