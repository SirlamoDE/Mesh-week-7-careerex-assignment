// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, 'Item name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    locationFound: {
        type: String,
        required: [true, 'Location found is required'],
        trim: true,
    },
    dateFound: {
        type: Date,
        required: [true, 'Date found is required'],
        default: Date.now,
    },
    claimed: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Item', itemSchema);