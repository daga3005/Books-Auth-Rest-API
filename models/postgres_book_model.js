
import { pool } from '../database/postgres_connection.js'

export class PostgresBooksModel {
    static async getBooks() {
        try {
            const { rows } = await pool.query(`SELECT * FROM books;`)
            return rows
        } catch (e) {
             throw new Error(`Error de base de datos: ${e.message}`, { cause: e });

        }
    }
    static async getBooksById({id}){
         try {
            const { rows } = await pool.query(`SELECT * FROM books WHERE id= $1`, [id])
            if (rows[0] === 0) return  null; // No se encontró el libro
            return rows
       } catch (e) {
           throw new Error(`Error de base de datos: ${e.message}`, { cause: e });

        }
    }
}