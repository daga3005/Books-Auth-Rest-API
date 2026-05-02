
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


import { PostgresModel } from "../models/postgres_user_model.js"
import { validateLoginUser, validateRegisterUser } from "../schemas/user_schema.js"



export class UserController {
    static async register(req, res) {
        try {
            const result = validateRegisterUser(req.body)
            if (!result.success) {
                res.status(422).json({ "error": JSON.parse(result.error.message) })
            }
            const { username, password, email } = req.body

            const existingUser = await PostgresModel.findByEmail({ email })
            if (existingUser) return res.status(409).json({ "success": "false", "message": "Email is already used" })

            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds)
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = await PostgresModel.create({ username, password: hashedPassword, email })

            const token = jwt.sign({
                email: newUser.email
            },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: '1h'
                }
            )
            
            res.status(201)
            .send({ "success": "true", newUser, token })
            .cookie({
               httpOnly: true,
               secure: process.env.NODE_ENV='production',
               sameSite: 'lax',
               maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days

            })
        } catch (error) {
            console.log(error)
            return res.status(500).send("Server Error")
        }
    }
    static async login(req, res) {
        try {
            const result = validateLoginUser(req.body)
            if (!result.success) return res.status(422).json({ error: JSON.parse(result.error.message) })

            const { email, password } = result.data

            const existingUser = await PostgresModel.findByEmail({ email })
            console.log(existingUser)
            if (!existingUser) return res.status(404).send({ error: "User not found" })

            const matchPassword = await bcrypt.compare(password, existingUser.password)
            if (!matchPassword) return res.status(401).json({ error: "Invalid Password" })

            const token = jwt.sign({ email: existingUser.email }, process.env.JWT_SECRET_KEY,
                { expiresIn: '1h' }
            )
            console.log('token: ', token)
            return res.status(200).cookie('AccessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            })
                .json({ succes: "true", msg: "Te has logueado satisfactoriamente", token })



        } catch (error) {
            console.log(error)
            return res.status(500).send("Server Error")
        }
    }
    
    static async auth(req,res){
        res.render('auth')
    }
    static async fillBook(req,res){

    const token= req.cookies.AccessToken
    if(!token) return res.status(403).send('Access not Authorized, without token').render('auth')
    
try{
   const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
   console.log(data)
   res.status(200).render('books')
   
}catch(error){
    console.log(error)
  return res.status(401).send('Access not Authorized, invalid token')
}
}

}


