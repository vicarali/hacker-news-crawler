import { Router } from 'express';

import Paths from '@src/common/constants/Paths';

import HackerNewsRoutes from './HackerNewsRoutes';

/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

// ----------------------- Add HackerNewsRouter --------------------------------- //

const hackerNewsRouter = Router();

hackerNewsRouter.get(Paths.HackerNews.Get, HackerNewsRoutes.getAll);
hackerNewsRouter.get(
  Paths.HackerNews.GetMoreThanFiveWords,
  HackerNewsRoutes.getMoreThanFiveWords,
);
hackerNewsRouter.get(
  Paths.HackerNews.GetLessOrEqualToFiveWords,
  HackerNewsRoutes.getLessOrEqualToFiveWords,
);

apiRouter.use(Paths.HackerNews._, hackerNewsRouter);

/******************************************************************************
                                Export
******************************************************************************/

export default apiRouter;
