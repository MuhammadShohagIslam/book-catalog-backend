import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post(
  '/create-category',
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.createCategory
);

router.get('/', CategoryController.getAllCategories);

router
  .route('/:id')
  .get(CategoryController.getSingleCategory)
  .patch(
    validateRequest(CategoryValidation.updateCategoryZodSchema),
    CategoryController.updateCategory
  )
  .delete(CategoryController.deleteCategory);

export const CategoryRoutes = router;
