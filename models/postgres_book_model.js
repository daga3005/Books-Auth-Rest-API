
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
    static async getBooksById({ id }) {
        try {
            const { rows } = await pool.query(`SELECT * FROM books WHERE id= $1`, [id])
            if (rows[0] === 0) return null; // No se encontró el libro
            return rows
        } catch (e) {
            throw new Error(`Error de base de datos: ${e.message}`, { cause: e });

        }
    }
    static async createBook({ name, author, date, rate }) {
        try {

            const result = await pool.query(`
            INSERT INTO books ( name, author, date, rate) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `, [name, author, date, rate]);
        console.log('result.rows',result.rows)
            return result.rows[0];
        } catch (e) {
            throw new Error(`Error de base de datos: ${e.message}`, { cause: e });
        }

    };
    static async updateBook({ bookData, id }) {
        try {
            const { name, author, date, rate } = bookData;
            const result = await pool.query(`
            UPDATE books 
            SET name = $1, author = $2, date = $3, rate = $4
            WHERE id = $5 
            RETURNING *
        `, [name, author, date, rate, id]);
            return result.rows[0] || null;
        } catch (e) {
            throw new Error(`Error de base de datos: ${e.message}`, { cause: e });
        }
    };
    static  async deleteBook({id}){
        try {
        
        const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
        return result.rows[0] || null;
    } catch (e) {
            throw new Error(`Error de base de datos: ${e.message}`, { cause: e });
    }
};
    }

