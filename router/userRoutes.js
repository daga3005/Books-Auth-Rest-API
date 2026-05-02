
import { Router } from 'express'
import { UserController } from '../controllers/user_controller.js'





export const userRouter = Router()

userRouter.get('/', (req, res) => {
    res.send("Api de Libros")
})
userRouter.post('/register', UserController.register)

userRouter.post('/login', UserController.login)

userRouter.get('/auth', UserController.auth)
userRouter.get('/book', UserController.fillBook)