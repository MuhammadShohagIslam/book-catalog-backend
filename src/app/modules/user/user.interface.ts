/* eslint-disable no-unused-vars */
import { UserRole } from '@prisma/client';

export type UserResponse = {
  address: string;
  id: string;
  contactNo: string;
  email: string;
  name: string;
  profileImg: string;
  role: UserRole;
  createdAt: Date,
  updatedAt: Date
};

export type UserFilterOptionType = {
  searchTerm?: string;
};
