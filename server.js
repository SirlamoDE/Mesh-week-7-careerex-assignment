// server.js

// Import required modules
const express = require('express');
require('dotenv').config(); // Load environment variables from .env file

const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies

// Basic Route
app.get('/', (req, res) => {
    res.send('Lost & Found API Running!');
});

// API Routes
app.use('/api/items', itemRoutes); // Routes for item-related operations

// Global Error Handler
// Handles unhandled errors and sends a generic response
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(err.status || 500).send({
        message: err.message || 'Something broke!',
        error: process.env.NODE_ENV === 'production' ? {} : err.stack, // Hide stack trace in production
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});