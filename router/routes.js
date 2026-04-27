
import { Router } from 'express'
import { UserController } from '../controllers/user_controller.js'





export const router = Router()

router.get('/', (req, res) => {
    res.send("Api de Libros")
})
router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.get('/auth', UserController.auth)
router.get('/books', UserController.fillBook)