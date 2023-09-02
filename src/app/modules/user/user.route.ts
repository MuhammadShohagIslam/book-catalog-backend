import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../../enum/user';

const router = express.Router();


router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);


router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser)
  .patch(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateUser
  )
  .delete(UserController.deleteUser);

export const UserRoutes = router;
