/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import responseReturn from '../../../shared/responseReturn';
import { AuthService } from './auth.service';
import { ILoginUserResponse } from '../../../interfaces/common';

const signUpUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    const result = await AuthService.signUpUser(userData);

    responseReturn<ILoginUserResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User sign up successfully!',
      data: result,
    });
  }
);

export const AuthUserController = {
  signUpUser
};
