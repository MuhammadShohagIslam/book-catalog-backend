import express from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';
import { ENUM_USER_ROLE } from '../../../enum/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getAllOrders
);

router.get(
  '/:orderId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getSingleOrder
);

export const OrderRoutes = router;
