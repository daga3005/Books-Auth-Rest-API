import { PostgresBooksModel } from "../models/postgres_book_model.js";
import { validateBook, validatePartialBook } from "../schemas/book_schema.js";



export class BookController {
    static async getBooks(req, res) {
        try {
            const books = await PostgresBooksModel.getBooks()
            res.json(books)
        } catch (error) {
            console.error('Error en getLibros:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los libros',
                error: error.message
            });
        }
    }

    static async getBookById(req, res) {
        try {
            const { id } = req.params;
            const libro = await PostgresBooksModel.getBooksById({ id })
            if (!libro) {
                return res.status(404).json({
                    success: false,
                    message: 'Libro no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                libro
            });
        } catch (e) {
            console.error('Error en getLibro:', e);
            res.status(500).json({
                success: false,
                message: 'Error al obtener el libro',
                error: e.message
            });
        }

    }
    static async createBook(req, res) {
        console.log('req.body:', req.body);

        try {
            const validationResult = validateBook(req.body);

            if (!validationResult.success) {
                console.error('Errores de validación:', validationResult.error.message);

                const errors = validationResult.error?.message || [];
                return res.status(400).json({
                    success: false,
                    message: 'Datos de libro inválidos',
                    errors: JSON.parse(errors)
                });
            }
            const { name, author, date, rate } = validationResult.data;



            const newBook = await PostgresBooksModel.createBook({ name, author, date, rate });

            res.status(201).json({
                success: true,
                message: 'Libro creado exitosamente',
                data: newBook
            });
        } catch (error) {
            console.error('Error en createLibro:', error);
            res.status(500).json({
                success: false,
                message: 'Error al crear el libro',
                error: error.message
            });
        }
    }
    static async updateBook(req, res) {
        try {
            const { id } = req.params;
            
            // Verificar si el libro existe
            const existingBook = await PostgresBooksModel.getBooksById({ id });
            if (!existingBook) {
                return res.status(404).json({
                    success: false,
                    message: 'Libro no encontrado'
                });
            }
            const validationResult = validatePartialBook(req.body);
            
            if (!validationResult.success) {
                let errors = [];
                if (validationResult.error.errors) {
                    errors = validationResult.error.errors.map(err => ({
                        campo: err.path.join('.'),
                        mensaje: err.message
                    }));
                } else {
                    errors = [{ message: validationResult.error.message }];
                    }
                
                return res.status(400).json({
                    success: false,
                    message: 'Datos de libro inválidos',
                    errors: errors
                });
            }
            
            const { name, author, date, rate } = validationResult.data;
            const updateData = {
                name: name !== undefined ? name : existingBook.name,
                author: author !== undefined ? author : existingBook.author,
                date: date !== undefined ? date : existingBook.date,
                rate: rate !== undefined ? rate : existingBook.rate
            };
            
            const updatedBook = await PostgresBooksModel.updateBook({ 
                bookData: updateData, 
                id 
            });
            
            res.status(200).json({
                success: true,
                message: 'Libro actualizado exitosamente',
                data: updatedBook
            });
        } catch (error) {
            console.error('Error en updateBook:', error);
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el libro',
                error: error.message
                });
        }
    }
    static async deleteBook(req, res) {
        try {
            const { id } = req.params;
            
    
            const existingBook = await PostgresBooksModel.getBooksById({ id });
            if (!existingBook) {
                return res.status(404).json({
                    success: false,
                    message: 'Libro no encontrado'
                });
            }
            const deletedBook = await PostgresBooksModel.deleteBook({ id });
            
            res.status(200).json({
                success: true,
                message: 'Libro eliminado exitosamente',
                data: deletedBook
            });
        } catch (error) {
            console.error('Error en deleteBook:', error);
            res.status(500).json({
                success: false,
                message: 'Error al eliminar el libro',
                error: error.message
                });
        }
    }
}

       
        
    

