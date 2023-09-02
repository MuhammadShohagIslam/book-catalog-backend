/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { Order } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import { createOrder } from './order.interface';

const createOrder = async (
  decodedUser: JwtPayload,
  payload: createOrder
): Promise<Order | null> => {
  const { userId, role } = decodedUser;

  if (!userId && !role) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid User');
  }

  const createOrderObject = {
    userId,
    orderedBooks: payload.orderedBooks,
  };

  const result = await prisma.order.create({
    data: createOrderObject,
  });

  return result;
};

export const getAllOrders = async (
  decodedUser: JwtPayload
): Promise<Order[] | null> => {
  const { userId, role } = decodedUser;

  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid User');
  }

  let result = null;

  if (userId && role === 'customer') {
    result = await prisma.order.findMany({
      where: {
        userId: userId,
      },
    });
  }

  if (userId && role === 'admin') {
    result = await prisma.order.findMany();
  }

  return result;
};

export const getSingleOrder = async (
  orderId: string,
  decodedUser: JwtPayload
): Promise<Order | null> => {
  
  const { userId, role } = decodedUser;
  const isExitUser = await prisma.user.findUnique({
    where: {
      id: userId,
      role: role,
    },
  });

  let result = null;

  if (userId && role === 'customer') {
    if (isExitUser?.id === userId) {
      result = await prisma.order.findUnique({
        where: {
          id: orderId,
          userId: userId,
        },
      });
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid User');
    }
  }

  if (userId && role === 'admin') {
    result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
  }

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
