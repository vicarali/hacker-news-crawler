import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import HackerNewsService from '@src/services/HackerNewsService';

import { Req, Res } from './common/express-types';

/**
 * @openapi
 * /api/hacker-news/all:
 *  get:
 *    description: Get all Hacker News.
 *    responses:
 *      200:
 *        description: Return list of the 30 most recent Hacker News
 */
async function getAll(_: Req, res: Res) {
  const hackerNews = await HackerNewsService.getAll();
  res.status(HttpStatusCodes.OK).json(hackerNews);
}

/**
 * @openapi
 * /api/hacker-news/more-than-5-words:
 *  get:
 *    description: Get all Hacker News with more than 5 words, ordered descending by total of comments.
 *    responses:
 *      200:
 *        description: Return list from the 30 most recent Hacker News with more than 5 words in descending order by total of comments
 */
async function getMoreThanFiveWords(_: Req, res: Res) {
  const hackerNews = await HackerNewsService.getEntriesWithMoreThanFiveWords();
  res.status(HttpStatusCodes.OK).json(hackerNews);
}

/**
 * @openapi
 * /api/hacker-news/less-or-equal-to-5-words:
 *  get:
 *    description: Get all Hacker News with less or equal to 5 words, ordered descending by score.
 *    responses:
 *      200:
 *        description: Return list from the 30 most recent Hacker News with less or equal to 5 words in descending order by score
 */
async function getLessOrEqualToFiveWords(_: Req, res: Res) {
  const hackerNews =
    await HackerNewsService.getEntriesWithLessOrEqualToFiveWords();
  res.status(HttpStatusCodes.OK).json(hackerNews);
}

export default { getAll, getMoreThanFiveWords, getLessOrEqualToFiveWords };
