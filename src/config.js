import { config } from "dotenv";

config()

export const PORT = process.env.PORT

export const MYSQL_HOST = process.env.MYSQL_HOST
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD
export const MYSQL_USER = process.env.MYSQL_USER
export const MYSQL_PORT = process.env.MYSQL_PORT
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE

export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE
export const POSTGRES_HOST = process.env.POSTGRES_HOST 
export const POSTGRES_USER = process.env.POSTGRES_USER
export const POSTGRES_PORT = process.env.POSTGRES_PORT
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
