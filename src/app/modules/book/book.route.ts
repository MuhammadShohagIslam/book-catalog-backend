import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/create-book',
  validateRequest(
    BookValidation.createBookZodSchema
  ),
  BookController.createBook
);

router.get('/', BookController.getAllBooks);

router
  .route('/:id')
  .get(BookController.getSingleBook)
  .patch(
    validateRequest(
      BookValidation.updateBookZodSchema
    ),
    BookController.updateBook
  )
  .delete(BookController.deleteBook);

export const BookRoutes = router;
