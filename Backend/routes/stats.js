const express = require('express');
const Book = require('../models/book');
const router = express.Router();
const { startOfWeek, endOfWeek } = require('date-fns');

router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const start = startOfWeek(now);
    const end = endOfWeek(now);

    const completedBooks = await Book.find({ status: 'Completed', createdAt: { $gte: start, $lte: end } });
    const averageProgress = await Book.aggregate([
      { $group: { _id: null, avgProgress: { $avg: '$progress' } } },
    ]);

    res.status(200).json({
      completedBooks: completedBooks.length,
      averageProgress: averageProgress[0]?.avgProgress || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
