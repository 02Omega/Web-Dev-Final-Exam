import React from 'react';
import BookList from '../components/BookList';
import AddBookForm from '../components/AddBookForm';

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Reading Tracker</h1>
      <AddBookForm />
      <BookList />
    </div>
  );
}

export default Dashboard;
