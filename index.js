
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import  {userRouter}  from './router/userRoutes.js'
import { booksRouter } from './router/booksRoutes.js'

dotenv.config()

const app= express()
app.use(cors())
app.use(express.json())
app.set('view engine', 'ejs')
app.use(cookieParser())

const Port= process.env.Port ?? 3000


app.use(userRouter),
app.use('/books',booksRouter),


app.use(morgan('dev'))



app.listen(Port, ()=>{

    console.log(`Server running on port http://localhost:${Port}`)
})
