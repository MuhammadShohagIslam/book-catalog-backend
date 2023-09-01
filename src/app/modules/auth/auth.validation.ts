import { z } from 'zod';
import { userRole } from '../../../constants/user';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'FirstName is required!',
    }),
    email: z
      .string({
        required_error: 'Email is required!',
      })
      .email(),
    address: z.string({
      required_error: 'Address is required!',
    }),
    contactNo: z.string({
      required_error: 'Contact Number is required!',
    }),
    profileImg: z.string({
      required_error: 'Profile Image is required!',
    }),
    password: z.string({
      required_error: 'Password is required!',
    }),
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: 'Role is required!',
    }),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required!',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required!',
    }),
  }),
});

export const AuthUserValidation = {
  createUserZodSchema,
  loginUserZodSchema,
};
