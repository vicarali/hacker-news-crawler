import { Router } from 'express';

import Paths from '@src/common/constants/Paths';

import HackerNewsRoutes from './HackerNewsRoutes';
import UserRoutes from './UserRoutes';

/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

// ----------------------- Add UserRouter --------------------------------- //

const userRouter = Router();

userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

apiRouter.use(Paths.Users._, userRouter);

// ----------------------- Add HackerNewsRouter --------------------------------- //

const hackerNewsRouter = Router();

hackerNewsRouter.get(Paths.HackerNews.Get, HackerNewsRoutes.getAll);

apiRouter.use(Paths.HackerNews._, hackerNewsRouter);

/******************************************************************************
                                Export
******************************************************************************/

export default apiRouter;
