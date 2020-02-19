const { Pool } = require('pg');
// console.log(process.env.DB_HOST);

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  port: 5432,
})

console.log(`The database is up and running on port: ${pool.options.port}`);

module.exports = {
  pool,
}