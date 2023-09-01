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
import { BcryptHelper } from '../../../helpers/bcryptHelper';
import { SignUpResponse } from './auth.interface';

// sign up user service
const signUpUser = async (user: User): Promise<SignUpResponse | null> => {
  // check user already exit, if exit return error
  const isUserExit = await prisma.user.findFirst({
    where: {
      email: user?.email,
    },
  });

  if (isUserExit) {
    throw new ApiError(httpStatus.CONFLICT, 'User already exit!');
  }

  // hash the password
  const hashedPassword = await BcryptHelper.hashPassword(user.password);
  if (!hashedPassword) {
    throw new ApiError(httpStatus.CONFLICT, 'Password hashed failed!');
  }

  user.password = hashedPassword;

  const result = await prisma.user.create({
    data: user,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  // if user not create return error
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sign up failed!');
  }

  return result;
};

// login user service
const loginUser = async (user: User): Promise<ILoginUserResponse> => {
  const { password, email } = user;

  // check user already exit, if exit return error
  const isUserExit = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!isUserExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exit!');
  }

  //compare the password
  const isPasswordMatch = await BcryptHelper.comparePassword(
    password,
    isUserExit.password
  );

  if (!isPasswordMatch && password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is not match!');
  }

  const token = jwtHelpers.createToken(
    {
      userId: isUserExit.id,
      role: isUserExit.role,
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
  loginUser,
};
