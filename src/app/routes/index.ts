import express, { Router } from 'express';


const router: Router = express.Router();

const moduleRoutes = [
  
];

moduleRoutes.forEach(mr => router.use(mr.path, mr.route));

export default router;
