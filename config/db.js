const { Pool } = require('pg');   //Pool is used to reuse database connections instead of creating a new one for every query, making your application faster and more efficient.
//without pool 1.Opens a new connection.2.Sends the query.3.Closes the connection.


// Uses DATABASE_URL if present, otherwise falls back to PG* env vars
const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
      }
);


//.on() method lets you listen for those events.like 1.A connection is created.2. connection is removed.3.An error occurs..... General syntax: object.on("eventName", callbackFunction);
//When this event happens, run this function."

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL client error:', err);
  process.exit(1);  //This immediately stops the Node.js application.  0 means the program ended successfully.Any non-zero value (like 1) means it ended because of an error.
});

const query = (text, params) => pool.query(text, params);  //It creates a shorter function that calls pool.query() for you.


//“Is my PostgreSQL database working or not?”
const connectDB = async () => {
  try {
    await pool.query('SELECT 1');  //SELECT 1 means:“Just give me number 1”.....It does NOT fetch real data. It is just a health check.
    console.log('PostgreSQL connected');
  } catch (err) {
    console.error('PostgreSQL connection error:', err.message);
    process.exit(1);
  }
};

module.exports = { pool, query, connectDB };
