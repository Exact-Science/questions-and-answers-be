const { Pool } = require('pg');
require('dotenv').config()


const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  // maxSockets: 300, //0 this appears to be helpful
  // poolSize: 200, //0
  // waitForAvailableConnectionTimeoutMillis: 2000000,  //0
  // waitForReconnectConnectionMillis: 90000,  // Milliseconds to wait between retry queries after receiving a connection error
  // connectionReconnectTimeoutMillis: 90000,
  // max: 10, // 20
  // idleTimeoutMillis: 100000, // 30000
  // connectionTimeoutMillis: 2000, // 2000x`x`
  port: 5432,
})

console.log(`The database is up and running on port: ${pool.options.port}`);

module.exports = {
  pool,
}