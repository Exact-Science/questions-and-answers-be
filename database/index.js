const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'sdc',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})