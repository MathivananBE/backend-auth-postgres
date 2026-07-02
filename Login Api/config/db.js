const { Pool } = require('pg');

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

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL client error:', err);
  process.exit(1);
});

const query = (text, params) => pool.query(text, params);

const connectDB = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('PostgreSQL connected');
  } catch (err) {
    console.error('PostgreSQL connection error:', err.message);
    process.exit(1);
  }
};

module.exports = { pool, query, connectDB };
