import express from 'express';
import { AuthUserController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthUserValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthUserValidation.createUserZodSchema),
  AuthUserController.signUpUser
);

router.post(
  '/login',
  validateRequest(AuthUserValidation.loginUserZodSchema),
  AuthUserController.signUpUser
);

export const AuthRoutes = router;
