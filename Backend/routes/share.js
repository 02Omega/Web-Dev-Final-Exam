const express = require('express');
const Book = require('../models/book');
const router = express.Router();

router.get('/:id/share', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found.' });

    const shareableLink = `${req.protocol}://${req.get('host')}/shared/book/${book._id}`;
    res.status(200).json({ shareableLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found.' });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
