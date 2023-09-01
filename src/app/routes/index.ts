import express, { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';

const router: Router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(mr => router.use(mr.path, mr.route));

export default router;
