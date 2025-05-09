// controllers/itemController.js

// Import the Item model
const Item = require('../models/item');

// Utility function for error handling
const handleError = (res, error, customMessage) => {
    console.error(customMessage, error);
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
    }
    if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid item ID format.' });
    }
    res.status(500).json({ message: customMessage });
};

// @desc    Add a new found item
// @route   POST /api/items
// @access  Public (for now, can be restricted later)
const addItem = async (req, res) => {
    try {
        const { itemName, description, locationFound, dateFound } = req.body;

        if (!itemName || !description || !locationFound) {
            return res.status(400).json({ message: 'Please provide item name, description, and location found.' });
        }

        const newItem = new Item({
            itemName,
            description,
            locationFound,
            dateFound: dateFound ? new Date(dateFound) : Date.now(), // Allow specific date or default to now
            claimed: false, // Default to false
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        handleError(res, error, 'Server error while adding item.');
    }
};

// @desc    View all unclaimed items
// @route   GET /api/items/unclaimed
// @access  Public
const getUnclaimedItems = async (req, res) => {
    try {
        const items = await Item.find({ claimed: false }).sort({ dateFound: -1 }); // Sort by most recently found
        res.status(200).json(items);
    } catch (error) {
        handleError(res, error, 'Server error while fetching unclaimed items.');
    }
};

// @desc    View one item by ID
// @route   GET /api/items/:id
// @access  Public
const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found.' });
        }
        res.status(200).json(item);
    } catch (error) {
        handleError(res, error, 'Server error while fetching item.');
    }
};

// @desc    Update an item's details or mark as claimed
// @route   PUT /api/items/:id
// @access  Public (for now)
const updateItem = async (req, res) => {
    try {
        const updates = req.body; // Get updates from request body
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found.' });
        }

        // Update fields dynamically
        Object.keys(updates).forEach((key) => {
            item[key] = updates[key];
        });

        const updatedItem = await item.save(); // This runs schema validations
        res.status(200).json(updatedItem);
    } catch (error) {
        handleError(res, error, 'Server error while updating item.');
    }
};

// @desc    Delete an old/irrelevant entry
// @route   DELETE /api/items/:id
// @access  Public (for now, typically admin only)
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found.' });
        }

        await Item.deleteOne({ _id: req.params.id }); // Or item.remove() if you fetched the document
        res.status(200).json({ message: 'Item deleted successfully.' });
    } catch (error) {
        handleError(res, error, 'Server error while deleting item.');
    }
};

module.exports = {
    addItem,
    getUnclaimedItems,
    getItemById,
    updateItem,
    deleteItem,
};