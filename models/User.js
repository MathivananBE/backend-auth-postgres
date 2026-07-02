const bcrypt = require('bcryptjs');
const { query } = require('../config/db');

const User = {
  // Create a new user; hashes the password before inserting
  async create({ name, email, password }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name, email, hashedPassword]
    );

    return result.rows[0];
  },

  // Find a user by email, including the password hash (for login checks)
  async findByEmailWithPassword(email) {
    const result = await query(
      `SELECT id, name, email, password FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  },

  // Find a user by email, without the password
  async findByEmail(email) {
    const result = await query(
      `SELECT id, name, email, created_at FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  },

  // Find a user by id, without the password
  async findById(id) {
    const result = await query(
      `SELECT id, name, email, created_at FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },

  async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  },
};

module.exports = User;
