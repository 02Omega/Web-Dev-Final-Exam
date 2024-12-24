import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SharedBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/share/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching shared book:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading book...</p>;

  if (!book) return <p>Book not found. Please check the shared link!</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Progress:</strong> {book.progress}%</p>
      <p><strong>Status:</strong> {book.status}</p>
    </div>
  );
}

export default SharedBook;
