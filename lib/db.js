import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASS || "rootpass", // use your password
  database: process.env.MYSQL_DB || "thecollegeperiodical",
});

export default db;