const { Pool, Client } = require('pg')
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

pool.query('SELECT NOW()', (err: any, res: any) => {
  // console.log(err, res)
  pool.end()
});

const client = new Client({
  connectionString,
});

client.connect();

client.query('SELECT NOW()', (err: any, res: any) => {
  // console.log(err, res)
  client.end()
});
