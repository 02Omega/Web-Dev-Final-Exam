import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/books')
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/books/${id}`)
      .then(() => setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id)))
      .catch((error) => console.error('Error deleting book:', error));
  };

  if (loading) return <p>Loading books...</p>;

  if (books.length === 0) return <p>No books available. Add your first book!</p>;

  return (
    <div>
      <h2 className="text-xl mb-4">Your Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id} className="border-b py-2 flex justify-between">
            <div>
              <p>{book.title} by {book.author}</p>
              <p>Progress: {book.progress}%</p>
            </div>
            <button onClick={() => handleDelete(book._id)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;