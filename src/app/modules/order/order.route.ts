import express from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';
import { ENUM_USER_ROLE } from '../../../enum/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.CUSTOMER),
    validateRequest(OrderValidation.createOrderZodSchema),
    OrderController.createOrder
  )
  .get(auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllOrders);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.getOrdersByCustomer
);

export const OrderRoutes = router;
