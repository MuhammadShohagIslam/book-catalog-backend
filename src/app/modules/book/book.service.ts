/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { PaginationOptionType } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { BookFieldsType } from './book.interface';
import {
  bookRelationalFields,
  bookRelationalFieldsMapper,
  bookSearchableFields,
} from './book.constant';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const createBook = async (payload: Book): Promise<Book | null> => {
  const result = await prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBooks = async (
  paginationOption: PaginationOptionType,
  filters: BookFieldsType
): Promise<IGenericResponse<Book[]>> => {
  const { search, minPrice, maxPrice, ...filterData } = filters;
  const { page, size, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(paginationOption);

  // for dynamic searching
  const addCondition = [];
  if (search) {
    addCondition.push({
      OR: bookSearchableFields.map(item => ({
        [item]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  // filtering price range
  if (minPrice || maxPrice) {
    // check price is number or string value, if string, throw error
    if (isNaN(Number(minPrice)) || isNaN(Number(maxPrice))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Price Range Value');
    }

    const priceCondition: Partial<{ price: { gte?: number; lte?: number } }> =
      {};

    if (minPrice) {
      priceCondition.price = {
        gte: Number(minPrice),
      };
    }

    if (maxPrice) {
      priceCondition.price = {
        ...priceCondition.price,
        lte: Number(maxPrice),
      };
    }

    addCondition.push(priceCondition);
  }

  // for dynamic filtering
  if (Object.keys(filterData).length > 0) {
    addCondition.push({
      AND: Object.keys(filterData).map(key => {
        if (bookRelationalFields.includes(key)) {
          return {
            [bookRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition: Prisma.BookWhereInput = addCondition.length
    ? { AND: addCondition }
    : {};

  const result = await prisma.book.findMany({
    where: whereCondition,
    include: {
      category: true,
    },
    skip,
    take: size,
    orderBy: sortCondition,
  });

  const total = await prisma.book.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      total,
      size,
    },
    data: result,
  };
};

const getBooksByCategoryId = async (
  categoryId: string,
  paginationOption: PaginationOptionType
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(paginationOption);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    skip,
    take: size,
    orderBy: sortCondition,
    include: {
      category: true,
    },
  });

  const total = await prisma.book.count({
    where: {
      categoryId,
    },
  });

  return {
    meta: {
      page,
      total,
      size,
    },
    data: result,
  };
};

const getSingleBook = async (payload: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id: payload,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const updateBook = async (id: string, payload: Partial<Book>) => {
  const result = await prisma.book.update({
    where: {
      id: id,
    },
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};

const deleteBook = async (payload: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id: payload,
    },
  });
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getBooksByCategoryId,
  getSingleBook,
  updateBook,
  deleteBook,
};
