import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import AllRouters from './app/routes';

const app: Application = express();

// middleware's
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all of routers
app.use('/api/v1', AllRouters);

// root router or health router
app.get('/', (_req: Request, res: Response) => {
  res.json('SMA Core Service is running');
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    statusCode: httpStatus.NOT_FOUND,
    message: 'Not Found Route!',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Not Found Route!',
      },
    ],
  });
  next();
});

export default app;
