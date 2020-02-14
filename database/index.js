const { Pool, Client } = require('pg');
const connectionString = 'postgressql://postgres:'
const client = new Client({
  connectionString: connectionString
});

await client.connect();