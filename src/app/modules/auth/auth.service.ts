/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { ILoginUserResponse } from '../../../interfaces/common';
import { prisma } from '../../../shared/prisma';

const signUpUser = async (user: User): Promise<ILoginUserResponse | null> => {
  // check user already exit, if exit return error
  const isUserExit = await prisma.user.findFirst({
    where: {
      email: user?.email,
    },
  });

  if (isUserExit) {
    throw new ApiError(httpStatus.CONFLICT, 'User already exit!');
  }

  const result = await prisma.user.create({
    data: user,
  });

  // if user not create return error
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sign up failed!');
  }

  const token = jwtHelpers.createToken(
    {
      userId: result.id,
      role: result.role,
    },
    config.jwt_secret as Secret,
    config.jwt_expire_in as string
  );
  return {
    token,
  };
};

export const AuthService = {
  signUpUser,
};
