import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';


dotenv.config();

// console.log(process.env)

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env['DB_HOST'],
    port: Number(process.env['DB_PORT']),
    username: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migration/**/*.ts'],
    schema: 'public',
    logging: true,

});


export default dataSource;