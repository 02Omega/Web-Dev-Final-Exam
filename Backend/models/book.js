const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  status: { type: String, enum: ['In Progress', 'Completed'], default: 'In Progress' },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
