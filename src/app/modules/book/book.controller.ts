import { Book } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationOptionFields } from '../../../constants/pagination';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import responseReturn from '../../../shared/responseReturn';
import { BookService } from './book.service';
import { bookFilterableFields } from './book.constant';

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookService.createBook(
      req.body
    );

    if (!result) {
      throw new ApiError(400, 'Failed to create Book!');
    }

    responseReturn<Book>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book created successfully!',
      data: result,
    });
  }
);

const getAllBooks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // for search and filtering
    const filters = pick(req.query, bookFilterableFields);
    // for pagination
    const paginationOption = pick(req.query, paginationOptionFields);
    const result = await BookService.getAllBooks(
      paginationOption,
      filters
    );

    responseReturn<IGenericResponse<Book[]>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Books retrieved successfully!',
      data: result,
    });
  }
);

const getSingleBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BookService.getSingleBook(
      id
    );

    responseReturn<Book>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book retrieved successfully!',
      data: result,
    });
  }
);

const updateBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await BookService.updateBook(
      id,
      updatedData
    );

    responseReturn<Book>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book updated successfully!',
      data: result,
    });
  }
);

const deleteBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BookService.deleteBook(id);

    responseReturn<Book>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book deleted successfully!',
      data: result,
    });
  }
);

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
