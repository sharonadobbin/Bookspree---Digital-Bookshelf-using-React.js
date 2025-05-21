import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem('books');
    return stored ? JSON.parse(stored) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newBook = {
      id: editBookId || Date.now(),
      title: formData.get('title'),
      author: formData.get('author'),
      link: formData.get('link'),
      cover: formData.get('cover') || 'https://via.placeholder.com/150x220?text=No+Cover',
      shelf: formData.get('shelf'),
    };

    if (editBookId) {
      setBooks((prev) =>
        prev.map((book) => (book.id === editBookId ? newBook : book))
      );
    } else {
      setBooks((prev) => [newBook, ...prev]);
    }

    e.target.reset();
    setShowForm(false);
    setEditBookId(null);
  };

  const startEdit = (book) => {
    setEditBookId(book.id);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('title').value = book.title;
      document.getElementById('author').value = book.author;
      document.getElementById('link').value = book.link;
      document.getElementById('cover').value = book.cover;
      document.querySelector(`input[name="shelf"][value="${book.shelf}"]`).checked = true;
    }, 0);
  };

  const deleteBook = (id) => {
    if (window.confirm('Delete this book?')) {
      setBooks((prev) => prev.filter((book) => book.id !== id));
    }
  };

  const shelves = ['read', 'currently reading', 'want to read', 'did not finish'];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-red-800 mb-6">Book Dashboard</h1>

      <div className="text-center mb-6">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditBookId(null);
          }}
          className="bg-red-800 text-white px-6 py-2 rounded-full font-semibold"
        >
          {showForm ? 'Close Form' : editBookId ? 'Edit Book' : 'Add New Book'}
        </button>
      </div>

      <div className="text-center mb-6">
        <Link
          to="/genre-search"
          className="bg-red-800 text-white px-6 py-2 rounded-full font-semibold inline-block"
        >
          Search by Genre
        </Link>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8 space-y-4"
        >
          <input id="title" name="title" placeholder="Book Title" required className="w-full border p-2 rounded" />
          <input id="author" name="author" placeholder="Author" required className="w-full border p-2 rounded" />
          <input
            id="link"
            name="link"
            type="url"
            placeholder="Goodreads Link"
            required
            className="w-full border p-2 rounded"
          />
          <input
            id="cover"
            name="cover"
            type="url"
            placeholder="Cover Image URL (optional)"
            className="w-full border p-2 rounded"
          />
          <div className="space-x-4">
            {shelves.map((shelf) => (
              <label key={shelf} className="capitalize">
                <input type="radio" name="shelf" value={shelf} required className="mr-1" />
                {shelf}
              </label>
            ))}
          </div>
          <button type="submit" className="bg-red-800 text-white px-6 py-2 rounded-full font-semibold">
            {editBookId ? 'Update Book' : 'Add Book'}
          </button>
        </form>
      )}

      {shelves.map((shelf) => (
        <div key={shelf} className="mb-12">
          <h2 className="text-xl font-semibold text-red-800 capitalize border-b-2 border-red-800 mb-4">
            {shelf}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books
              .filter((book) => book.shelf === shelf)
              .map((book) => (
                <div key={book.id} className="bg-white p-4 shadow rounded relative flex flex-col items-center">
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center hover:opacity-90"
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="h-48 w-auto object-cover mb-2 rounded"
                    />
                    <h3 className="text-red-800 font-bold">{book.title}</h3>
                    <p className="text-gray-600">{book.author}</p>
                  </a>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => startEdit(book)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
