
import z from "zod";

const userRegisterSchema= z.object({
    username: z.string({
        required_error: "El username es requerido",
        invalid_type_error: "El username debe ser un texto"
    }).min(3,'Username must be at least 3 characters'),

    email: z.email('Introduce a valid email'),

    password: z.string({
        required_error: "El username es requerido",
        invalid_type_error: "El username debe ser un texto"
    }).min(8,'Password must be at least 8 characters')
})

const userLoginSchema= z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Required Password')
})

export const validateRegisterUser=(newUser)=>{
   
    return userRegisterSchema.safeParse(newUser)
}
export const validateLoginUser=(user)=>{
   return userLoginSchema.safeParse(user)
}