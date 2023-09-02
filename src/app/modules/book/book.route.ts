import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enum/user';

const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

router.get('/:categoryId/category', BookController.getBooksByCategoryId);
router.get('/', BookController.getAllBooks);

router
  .route('/:id')
  .get(BookController.getSingleBook)
  .patch(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(BookValidation.updateBookZodSchema),
    BookController.updateBook
  )
  .delete(auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);

export const BookRoutes = router;
