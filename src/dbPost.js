import pkg from 'pg';
const { Pool } = pkg;
import { 
  POSTGRES_DATABASE, 
  POSTGRES_HOST, 
  POSTGRES_USER, 
  POSTGRES_PORT, 
  POSTGRES_PASSWORD 
} from "./config.js";

export const pool = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
  database: POSTGRES_DATABASE,
});
