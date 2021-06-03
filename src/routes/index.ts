import { Router } from 'express';
import authRouter from './auth.routes';
import usersRouter from './users.routes';
import adminsRouter from './admins.routes';
import isAdmin from '../middlewares/isAdmin';

const routes = Router();
routes.use('/auth', authRouter);
routes.use('/admins', isAdmin, adminsRouter);
routes.use('/users', usersRouter);

export default routes;
