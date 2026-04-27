
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import { router } from './router/routes.js'

dotenv.config()

const app= express()
app.use(express.json())
app.set('view engine', 'ejs')
app.use(cookieParser())

const Port= process.env.Port ?? 3000


app.use(router),

app.use(morgan('dev'))



app.listen(Port, ()=>{

    console.log(`Server running on port http://localhost:${Port}`)
})
