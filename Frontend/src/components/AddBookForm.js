import React, { useState } from 'react';
import axios from 'axios';

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('In Progress'); // Default status
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Send book data to backend
    axios.post('/api/books', { title, author, genre, progress: 0, status })
      .then(() => {
        setTitle('');
        setAuthor('');
        setGenre('');
        setStatus('In Progress'); // Reset status
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error adding book:', error);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full p-2 border mb-2"
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="block w-full p-2 border mb-2"
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="block w-full p-2 border mb-2"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="block w-full p-2 border mb-2"
      >
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded" disabled={loading}>
        {loading ? 'Adding...' : 'Add Book'}
      </button>
    </form>
  );
}

export default AddBookForm;
