// import mysql from "mysql2/promise";

// const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT || 3306,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   ssl: { rejectUnauthorized: false },
// });

// export default connection;


import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 15307, // use your Aiven port
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.SSL_CA, // this is your certificate from Vercel env variable
  },
});

export default connection;
