import { Category } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationOptionFields } from '../../../constants/pagination';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import responseReturn from '../../../shared/responseReturn';
import { CategoryService } from './category.service';
import { categoryFilterableFields } from './category.constant';

const createCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.createCategory(req.body);

    if (!result) {
      throw new ApiError(400, 'Failed to create Category!');
    }

    responseReturn<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category created successfully!',
      data: result,
    });
  }
);

const getAllCategories: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // for search and filtering
    const filters = pick(req.query, categoryFilterableFields);
    // for pagination
    const paginationOption = pick(req.query, paginationOptionFields);
    const result = await CategoryService.getAllCategories(
      paginationOption,
      filters
    );

    responseReturn<IGenericResponse<Category[]>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Categories retrieved successfully!',
      data: result,
    });
  }
);

const getSingleCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CategoryService.getSingleCategory(id);

    responseReturn<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category retrieved successfully!',
      data: result,
    });
  }
);

const updateCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await CategoryService.updateCategory(id, updatedData);

    responseReturn<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category updated successfully!',
      data: result,
    });
  }
);

const deleteCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CategoryService.deleteCategory(id);

    responseReturn<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category deleted successfully!',
      data: result,
    });
  }
);

export const CategoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
