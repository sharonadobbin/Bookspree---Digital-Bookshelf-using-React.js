import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const defaultBooks = [
  {
    id: 401,
    title: 'The Diary of a Young Girl',
    author: 'Anne Frank',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1696989545i/127441416.jpg',
    externalLink: 'https://www.goodreads.com/book/show/127441416-the-diary-of-a-young-girl',
  },
  {
    id: 402,
    title: 'Long Walk to Freedom',
    author: 'Nelson Mandela',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327997342i/318431.jpg',
    externalLink: 'https://www.goodreads.com/book/show/318431.Long_Walk_to_Freedom',
  },
  {
    id: 403,
    title: 'Hidden Valley Road: Inside the Mind of an American Family',
    author: 'Robert Kolker',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1569289026l/50088631.jpg',
    externalLink: 'https://www.goodreads.com/book/show/50088631-hidden-valley-road',
  },
];

function GenreNonFictionBiographies() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books_nonfiction_biographies')) || [];
    setBooks([...defaultBooks, ...storedBooks]);
  }, []);

  useEffect(() => {
    const userAddedBooks = books.filter(book => book.id > 1000);
    localStorage.setItem('books_nonfiction_biographies', JSON.stringify(userAddedBooks));
  }, [books]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedBook = {
      id: editBookId || Date.now(),
      title: formData.get('title'),
      author: formData.get('author'),
      cover: formData.get('cover') || 'https://via.placeholder.com/150x220?text=No+Cover',
      externalLink: formData.get('externalLink'),
    };

    if (editBookId) {
      setBooks(prev => prev.map(book => (book.id === editBookId ? updatedBook : book)));
    } else {
      setBooks(prev => [updatedBook, ...prev]);
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
      document.getElementById('externalLink').value = book.externalLink;
      document.getElementById('cover').value = book.cover;
    }, 0);
  };

  const deleteBook = (id) => {
    if (window.confirm('Delete this book?')) {
      setBooks(prev => prev.filter(book => book.id !== id));
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem' }}>
      <h2
        style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          color: '#9E122C',
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        Non-Fiction & Biographies
      </h2>
      <p style={{ color: '#555', textAlign: 'center', marginBottom: '1.5rem' }}>
        Explore inspiring books based on real lives and events.
      </p>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: '#9E122C',
            color: 'white',
            padding: '0.6rem 1.5rem',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {showForm ? 'Close Form' : 'Add New Book'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '6px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <input
            id="title"
            name="title"
            placeholder="Book Title"
            required
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            id="author"
            name="author"
            placeholder="Author"
            required
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            id="externalLink"
            name="externalLink"
            placeholder="Goodreads Link"
            required
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            id="cover"
            name="cover"
            placeholder="Cover Image URL (optional)"
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#9E122C',
              color: 'white',
              padding: '0.5rem',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {editBookId ? 'Update Book' : 'Add Book'}
          </button>
        </form>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2rem',
        }}
      >
        {books.map(book => (
          <BookCard
            key={book.id}
            {...book}
            onEdit={() => startEdit(book)}
            onDelete={() => deleteBook(book.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default GenreNonFictionBiographies;
