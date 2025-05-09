// Import mongoose for MongoDB connection
const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the provided URI or fallback to localhost
        const conn = await mongoose.connect(process.env.ATLAS_URI || 'mongodb://localhost:27017/lost-and-found');
        // Log successful connection
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Log error and exit process on failure
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;