import dotenv from 'dotenv'
import Elysia from "elysia";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import drizzleConfig from '../drizzle.config';
dotenv.config()

console.log(`env: ${process.env.DB_NAME}`);

console.log(process.env.DB_NAME
    ," ",process.env.DB_USER
    ," ",process.env.DB_PASSWORD
    ," ",process.env.DB_PORT
    ," ",process.env.DB_HOST);


const app = new Elysia()

try {
    dotenv.config()
    const client = new Pool({
      host: "postgres",
      port: 5432,
      user: "postgres",
      password: "postgres",
      database: "SUVE",
    });
    
    await client.connect();

}
catch (err) {
    console.log('pq esse erro so fala isso que saco');
    
    console.log(err);
}

app.listen(3003, () => {
  console.log('Server is running at port 3003');
})