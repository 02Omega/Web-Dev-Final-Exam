const express = require('express');
const Book = require('../models/book');
const router = express.Router();

/**
 * @route 
 * @desc 
 */
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, progress, status } = req.body;

    if (!title || !author || !genre) {
      return res.status(400).json({ message: 'Title, author, and genre are required.' });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      progress: progress || 0,
      status: status || 'In Progress',
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Failed to create book.' });
  }
});

/**
 * @route 
 * @desc 
 */
router.get('/', async (req, res) => {
  try {
    const books = await Book.find(); 
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Failed to fetch books.' });
  }
});

/**
 * @route 
 * @desc  
 */
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Failed to fetch book.' });
  }
});

/**
 * @route  
 * @desc  
 */
router.put('/:id', async (req, res) => {
  try {
    const { title, author, genre, progress, status } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, progress, status },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Failed to update book.' });
  }
});

/**
 * @route
 * @desc 
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.status(200).json({ message: 'Book deleted successfully.' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Failed to delete book.' });
  }
});

module.exports = router;
