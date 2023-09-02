/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { Order } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createOrder = async (payload: Order): Promise<Order | null> => {};

export const getAllOrders = async (): Promise<Order[] | null> => {
  const result = await prisma.order.findMany();
  return result;
};

export const getOrderByUser = async (
  id: string,
  decodedUser: JwtPayload
): Promise<Order | null> => {
  const { userId, role } = decodedUser;

  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid User');
  }

  let result = null;

  if (userId && role === 'customer') {
    result = await prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  if (userId && role === 'admin') {
    result = await prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  return result;
};

export const getOrdersByCustomer = async (
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

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrderByUser,
  getOrdersByCustomer,
};
