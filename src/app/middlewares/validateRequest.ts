import { AnyZodObject, ZodEffects } from 'zod';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (
  zodSchema: AnyZodObject | ZodEffects<AnyZodObject>
) => {
  // it is return a handler
  // it have to be req, res, next, if we want to say it is handler
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await zodSchema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      // pass error to global error handler
      // for this reason, it is not gone controller level if we get error
      next(error);
    }
  };
};

export default validateRequest;
