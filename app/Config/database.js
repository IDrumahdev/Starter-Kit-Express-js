import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const connected = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_Dialect
});

export default connected;