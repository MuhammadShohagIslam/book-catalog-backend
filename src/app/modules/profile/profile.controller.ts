import { RequestHandler, Request, Response } from 'express';
import responseReturn from '../../../shared/responseReturn';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { ProfileService } from './profile.service';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '@prisma/client';

const getUserProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...decodedUser } = req.user as JwtPayload;
    const result = await ProfileService.getUserProfile(decodedUser);

    responseReturn<User | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User profile fetched successfully!',
      data: result,
    });
  }
);

export const ProfileController = {
  getUserProfile,
};
