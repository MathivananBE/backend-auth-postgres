require('dotenv').config();
const express = require('express');
//const cors = require('cors'); 
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
//app.use(cors());  //Allow other origins (like my frontend) to access this backend.”
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Auth API (PostgreSQL) is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 6000;


//“First connect to the database. Only if it works, start the server.”
//connectDB()---This function tries to connect to PostgreSQL.
//If database is working ✔ → success
//If not ❌ → error

//.then() means:“After connectDB() finishes successfully, do this next.”....So this part only runs if database connection is OK.
//app.listen(PORT, ...)
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
