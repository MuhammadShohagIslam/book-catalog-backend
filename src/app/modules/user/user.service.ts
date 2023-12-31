/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, paginationHelper } from '../../../helpers/paginationHelper';
import { UserFilterOptionType, UserResponse } from './user.interface';
import { IGenericResponse } from '../../../interfaces/common';
import { userSearchableFields } from './user.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { PaginationOptionType } from '../../../interfaces/pagination';
import { User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

// get all users service
const getAllUsers = async (
  paginationOption: PaginationOptionType,
  filters: UserFilterOptionType
): Promise<IGenericResponse<UserResponse[]>> => {
  const { page, size, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(paginationOption);
  const { searchTerm, ...filtersData } = filters;
  const sortCondition: { [key: string]: SortOrder } = {};

  const addCondition = [];

  // for searchable filters
  if (searchTerm) {
    addCondition.push({
      OR: userSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // for filterable field
  if (Object.keys(filtersData).length) {
    addCondition.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = addCondition.length > 0 ? { AND: addCondition } : {};

  const result = await prisma.user.findMany({
    where: whereCondition,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: sortCondition,
    skip,
    take: size,
  });
  const total = await prisma.user.count({
    where: whereCondition,
  });

  const totalPage = total === 0 ? 0 : Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

// get single user service
const getSingleUser = async (data: string): Promise<UserResponse | null> => {
  const result = await prisma.user.findFirst({
    where: {
      id: data,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

// update user service
const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  // check user is exit, if not exit return error
  const isExit = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  if (!isExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const { ...userData } = payload;
  const updatedUserData: Partial<User> = { ...userData };

  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: updatedUserData,
  });

  return result;
};

// delete user service
const deleteUser = async (id: string): Promise<User | null> => {
  // check user is exit, if not exit return error
  const isExit = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!isExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const result = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
