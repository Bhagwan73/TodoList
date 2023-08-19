import "reflect-metadata";
import { DataSource } from "typeorm";
import { Todo } from "./entity/Todo";
import {User} from './entity/User'
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({path:"./.env"}) 

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port:parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Todo,User],
    migrations: [],
    subscribers: [],
});
