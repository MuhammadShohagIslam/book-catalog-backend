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
  const { searchTerm, ...filterData } = filters;
  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(paginationOption);

  // for dynamic searching
  const addCondition = [];
  if (searchTerm) {
    addCondition.push({
      OR: bookSearchableFields.map(item => ({
        [item]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
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
    take: limit,
    orderBy: sortCondition,
  });

  const total = await prisma.book.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      total,
      limit,
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
  getSingleBook,
  updateBook,
  deleteBook,
};
