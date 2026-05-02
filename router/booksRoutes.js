

import { Router } from 'express'
import { BookModel } from '../controllers/book_controller.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'



export const booksRouter = Router()


booksRouter.get('/',authenticateToken, BookModel.getBooks)

booksRouter.get('/:id', authenticateToken, BookModel.getBookById)



