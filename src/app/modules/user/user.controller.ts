import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import responseReturn from '../../../shared/responseReturn';
import httpStatus from 'http-status';
import { pick } from '../../../shared/pick';
import { paginationOptionFields } from '../../../constants/pagination';
import { userFilterableFields } from './user.constant';
import { User } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';

// get all users controller
const getAllUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterableFields);
    const paginationOptions = pick(req.query, paginationOptionFields);

    const result = await UserService.getAllUsers(paginationOptions, filters);

    responseReturn<IGenericResponse<User[]>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully!',
      data: result,
    });
  }
);

// get single user controller
const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await UserService.getSingleUser(id);

    responseReturn<User | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrieved successfully!',
      data: result,
    });
  }
);

// update user controller
const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await UserService.updateUser(id, updatedData);

    responseReturn<User | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  }
);

// delete user controller
const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UserService.deleteUser(id);

    responseReturn<User | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  }
);

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
