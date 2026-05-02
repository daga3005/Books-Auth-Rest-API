

import { Router } from 'express'
import { BookController } from '../controllers/book_controller.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'



export const booksRouter = Router()


booksRouter.get('/',authenticateToken, BookController.getBooks)
booksRouter.get('/:id', authenticateToken, BookController.getBookById)

booksRouter.post('/', authenticateToken, BookController.createBook)

booksRouter.patch('/:id', authenticateToken, BookController.updateBook)
booksRouter.delete('/:id', authenticateToken, BookController.deleteBook)




