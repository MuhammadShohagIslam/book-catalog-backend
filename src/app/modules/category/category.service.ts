/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category, Prisma } from '@prisma/client';
import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { PaginationOptionType } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { CategoryFieldsType } from './category.interface';
import { categorySearchableFields } from './category.constant';

const createCategory = async (payload: Category): Promise<Category | null> => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllCategories = async (
  paginationOption: PaginationOptionType,
  filters: CategoryFieldsType
): Promise<IGenericResponse<Category[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(paginationOption);

  // for dynamic searching
  const addCondition = [];
  if (searchTerm) {
    addCondition.push({
      OR: categorySearchableFields.map(item => ({
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
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition: Prisma.CategoryWhereInput = addCondition.length
    ? { AND: addCondition }
    : {};

  const result = await prisma.category.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: sortCondition,
  });

  const total = await prisma.category.count({
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

const getSingleCategory = async (payload: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id: payload,
    },
  });
  return result;
};

const updateCategory = async (id: string, payload: Partial<Category>) => {
  const result = await prisma.category.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};

const deleteCategory = async (payload: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id: payload,
    },
  });
  return result;
};


export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
