const express = require('express');
const cors = require('cors');
require('dotenv').config();

// routes import
const signupRouter = require('./routes/signupRoutes');
const signupCusRouter = require('./routes/signupCusRoutes');

const app = express();

// Enable CORS
app.use(cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use your routes
app.use('/user/restaurant', signupRouter);
app.use('/user/customer', signupCusRouter);

// Set up the server to listen on all interfaces (0.0.0.0)
app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
  console.log(`Server listening on port: ${process.env.PORT || 5000}`);
});
