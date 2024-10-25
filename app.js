const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

// routes import
const signupRouter = require('./routes/signupRoutes');
const signupCusRouter = require('./routes/signupCusRoutes');
const orderRouter = require('./routes/orderRoutes');
const restaurateurRouter = require('./routes/restaurateurRoutes');
const signInRouter = require('./routes/signInRouter');
const resProfileRouter = require('./routes/resProfileRoutes');
const menuRouter = require('./routes/menuRoutes');
const cusProfileRouter = require('./routes/cusProfileRouter');

const app = express();

// Enable CORS (Allow multiple origins for dev)
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.8.100'], // Adjust origins as needed
  optionsSuccessStatus: 200
}));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use your routes
app.use('/user/restaurant', signupRouter);
app.use('/user', signInRouter);
app.use('/user/customer', signupCusRouter);
app.use('/order/menuItems', orderRouter);
app.use('/restaurateur/restaurateurDetails', restaurateurRouter);
app.use('/restaurant', resProfileRouter);
app.use('/items', menuRouter);
app.use('/customer', cusProfileRouter);

// Database connection and server start
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync(); // Sync all models
  })
  .then(() => {
    // Start server only if DB connection is successful
    app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
      console.log(`Server listening on port: ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const response = {
    error: err.message || 'Server Error'
  };
  
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }
  
  console.error('Server Error:', err.message);
  res.status(statusCode).json(response);
});

// Graceful shutdown for SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('Gracefully shutting down');
  sequelize.close()
    .then(() => {
      console.log('Database connection closed');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error closing database connection:', err);
      process.exit(1);
    });
});
