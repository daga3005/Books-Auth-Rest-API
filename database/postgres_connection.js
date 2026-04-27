
import pg from "pg";
import dotenv from 'dotenv'

dotenv.config()

const {Pool} = pg

const connectionString= `postgresql://${process.env.DB_USER}:${process.env.DB_SECRET_KEY}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

export const pool= new Pool({
    allowExitOnIdle:true,
    connectionString: connectionString

})


 const verifyConnection= async()=>{
   try{
      await pool.query(`SELECT NOW()`)
      console.log('DATABASE CONNECTED')
   }catch(error){
    console.log(error)
   }
}
verifyConnection()
