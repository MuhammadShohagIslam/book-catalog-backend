import { UserRole } from '@prisma/client';

export type SignUpResponse = {
  address: string;
  id: string;
  contactNo: string;
  email: string;
  name: string;
  profileImg: string;
  role: UserRole;
};
