import { PostgresBooksModel } from "../models/postgres_book_model.js";



export class BookModel {
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
        const libro= await PostgresBooksModel.getBooksById({id})
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
        }catch(e){
          console.error('Error en getLibro:', e);
          res.status(500).json({
            success: false,
            message: 'Error al obtener el libro',
            error: e.message
        });
        }

    }

}