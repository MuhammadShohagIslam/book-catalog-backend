import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enum/user';

const router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.createCategory
);

router.get('/', CategoryController.getAllCategories);

router
  .route('/:id')
  .get(CategoryController.getSingleCategory)
  .patch(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(CategoryValidation.updateCategoryZodSchema),
    CategoryController.updateCategory
  )
  .delete(CategoryController.deleteCategory);

export const CategoryRoutes = router;
