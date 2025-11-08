
import { Sequelize } from "sequelize";
import { dbConfig } from "../config/server.config";

export const sequelize = new Sequelize({
    dialect : 'mysql',
    username: dbConfig.DB_USER,
    password: dbConfig.DB_PASS,
    host: dbConfig.DB_HOST,
    database:dbConfig.DB_NAME
})