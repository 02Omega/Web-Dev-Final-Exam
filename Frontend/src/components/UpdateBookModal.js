import React, { useState } from 'react';
import axios from 'axios';

function UpdateBookModal({ book, onClose, onUpdate }) {
  const [progress, setProgress] = useState(book.progress);
  const [status, setStatus] = useState(book.status || 'In Progress');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.put(`/api/books/${book._id}`, { progress, status })
      .then((response) => {
        onUpdate(response.data);
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        console.error('Error updating book:', error);
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4">Update {book.title}</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Progress:
            <input
              type="number"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              min="0"
              max="100"
              className="block w-full p-2 border mb-2"
            />
          </label>
          <label className="block mb-4">
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full p-2 border"
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateBookModal;
