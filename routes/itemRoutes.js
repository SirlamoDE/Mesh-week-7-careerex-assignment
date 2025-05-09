// Import required modules
const express = require('express');
const router = express.Router();
const {
    addItem,
    getUnclaimedItems,
    getItemById,
    updateItem,
    deleteItem,
} = require('../controllers/itemController');

// @desc    Add a new found item
// @route   POST /api/items
router.post('/', addItem);

// @desc    View all unclaimed items
// @route   GET /api/items/unclaimed
router.get('/unclaimed', getUnclaimedItems); // Specific route for unclaimed

// @desc    View one item by ID
// @route   GET /api/items/:id
router.get('/:id', getItemById);

// @desc    Update an item's details or mark as claimed
// @route   PUT /api/items/:id
router.put('/:id', updateItem);

// @desc    Delete an old/irrelevant entry
// @route   DELETE /api/items/:id
router.delete('/:id', deleteItem);

// Optional: A route to get ALL items (claimed and unclaimed)
// You can uncomment the following block if needed
// @desc    View all items
// @route   GET /api/items
//  router.get('/', async (req, res) => {
//     try {
//         const items = await require('../models/item').find({}).sort({ dateFound: -1 });
//         res.json(items);
//      } catch (err) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

module.exports = router;
