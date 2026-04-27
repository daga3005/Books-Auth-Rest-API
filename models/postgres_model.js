import { pool } from "../database/postgres_connection.js"

export class PostgresModel {
    static async create({ username, password, email }) {

        const {rows} = await pool.query(`INSERT INTO users (username,email,password) 
                                           VALUES($1,$2,$3) RETURNING id, username, email`
                                           , [username, email, password])
        return rows[0]

    }
    static async findByEmail({email}){
        const existingEmail= await pool.query(`SELECT * FROM users WHERE email= $1`,[email])
        const {rows}= existingEmail

        return rows[0]
    }
    

}