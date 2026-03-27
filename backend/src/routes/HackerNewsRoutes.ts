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

export default { getAll };
