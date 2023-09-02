/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

export const getUserProfile = async (
  decodedUser: JwtPayload
): Promise<User | null> => {
  const { userId, role } = decodedUser;

  const result = await prisma.user.findUnique({
    where: {
      id: userId,
      role: role,
    },
  });

  return result;
};

export const ProfileService = {
  getUserProfile,
};
