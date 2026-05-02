import z from "zod";


export const bookSchema = z.object({
    name: z.string()
        .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
        .max(255, { message: 'El nombre no puede exceder 255 caracteres' }),
        
    author: z.string()
        .min(2, { message: 'El autor debe tener al menos 2 caracteres' })
        .max(255, { message: 'El autor no puede exceder 255 caracteres' }),
        
    date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
            message: 'Fecha debe tener formato YYYY-MM-DD'
        })
        .optional()
        .nullable()
        .transform(val => val === '' ? null : val),
    rate: z.number()
        .max(5, { message: 'La valoración debe ser menor o igual a 5' })
        .multipleOf(0.01, { message: 'La valoración debe tener máximo 2 decimales' }),
        
});

export const validateBook=(book)=>{
    return bookSchema.safeParse(book)
}
export const validatePartialBook=(book)=>{
    return bookSchema.partial().safeParse(book)
}


