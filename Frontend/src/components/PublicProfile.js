import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PublicProfile() {
  const { username } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/profile/${username}`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">{username}'s Reading Profile</h1>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book._id} className="border-b py-2">
              <p><strong>{book.title}</strong> by {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Progress: {book.progress}%</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}

export default PublicProfile;