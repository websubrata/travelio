const mysql = require("mysql2/promise");

async function query(sql, params) {
  const HOST = process.env.DB_HOST;
  const USER = process.env.DB_USER;
  const PASS = process.env.DB_PASSWORD;
  const DB = process.env.DATABASE;
  const DB_PORT = process.env.DB_PORT;
  
  const connection = await mysql.createConnection({
    host: HOST,
    port : DB_PORT,
    user: USER,
    password: PASS,
    database: DB,
    connectTimeout: 60000,
  });
  const [results] = await connection.execute(sql, params);
  return results;
}

module.exports = {
  query,
};
