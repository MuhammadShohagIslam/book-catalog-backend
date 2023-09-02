import { RequestHandler, Request, Response } from 'express';
import ApiError from '../../../errors/ApiError';
import responseReturn from '../../../shared/responseReturn';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { OrderService } from './order.service';
import { JwtPayload } from 'jsonwebtoken';
import { Order } from '@prisma/client';

const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...orderData } = req.body;

    const result = await OrderService.createOrder(orderData);

    if (!result) {
      throw new ApiError(400, 'Failed to Create Order!');
    }
    responseReturn<Order>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  }
);

const getAllOrders: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.getAllOrders();

    responseReturn<Order[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders retrieved successfully!',
      data: result,
    });
  }
);

const getOrdersByCustomer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...decodedUser } = req.user as JwtPayload;
    const result = await OrderService.getOrdersByCustomer(decodedUser);

    responseReturn<Order[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Orders By Customer retrieved successfully!',
      data: result,
    });
  }
);

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrdersByCustomer,
};
