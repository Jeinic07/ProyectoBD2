import { createPool } from "mysql2/promise";
import { MYSQL_DATABASE, MYSQL_HOST,
MYSQL_USER, MYSQL_PORT, MYSQL_PASSWORD} from "./config.js";

export const pool = createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password:MYSQL_PASSWORD,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE 
});

