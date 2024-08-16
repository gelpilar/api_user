import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'mysql'
} );

const connectDB = async () => {
    try{
        await sequelize.authenticate();
        console.log("MySQL CONNECTED");
    } catch(err)
    {
        console.error('error en la conexion:', err);
        process.exit(1);
    }
};

export  {sequelize, connectDB}