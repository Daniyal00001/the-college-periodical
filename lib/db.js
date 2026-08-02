import mysql from "mysql2/promise";

// Configure SSL dynamically for Aiven cloud hosting
const sslConfig = process.env.SSL_CA
  ? { ca: process.env.SSL_CA, rejectUnauthorized: true }
  : process.env.DB_HOST && (process.env.DB_HOST.includes("aivencloud.com") || process.env.DB_HOST.includes("aiven"))
  ? { rejectUnauthorized: false }
  : false;

const connection = mysql.createPool({
  host: process.env.DB_HOST || "thecollegeperiodicall-thecollegeperiodical.j.aivencloud.com",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || "avnadmin",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "defaultdb",
  ssl: sslConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default connection;
