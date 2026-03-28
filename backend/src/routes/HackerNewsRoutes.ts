import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import HackerNewsService from '@src/services/HackerNewsService';

import { Req, Res } from './common/express-types';

/**
 * Get all Hacker News.
 *
 * @route GET /api/hacker-news/all
 */
async function getAll(_: Req, res: Res) {
  const hackerNews = await HackerNewsService.getAll();
  res.status(HttpStatusCodes.OK).json(hackerNews);
}

/**
 * Get all Hacker News with more than 5 words, ordered descending by total of comments.
 *
 * @route GET /api/hacker-news/more-than-5-words
 */
async function getMoreThanFiveWords(_: Req, res: Res) {
  const hackerNews = await HackerNewsService.getEntriesWithMoreThanFiveWords();
  res.status(HttpStatusCodes.OK).json(hackerNews);
}

/**
 * Get all Hacker News with less or equal to 5 words, ordered descending by score.
 *
 * @route GET /api/hacker-news/less-or-equal-to-5-words
 */
async function getLessOrEqualToFiveWords(_: Req, res: Res) {
  const hackerNews =
    await HackerNewsService.getEntriesWithLessOrEqualToFiveWords();
  res.status(HttpStatusCodes.OK).json(hackerNews);
}

export default { getAll, getMoreThanFiveWords, getLessOrEqualToFiveWords };
