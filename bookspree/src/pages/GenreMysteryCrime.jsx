import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const defaultBooks = [
  {
    id: 301,
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1684638853i/2429135.jpg',
    externalLink: 'https://www.goodreads.com/book/show/2429135.The_Girl_With_the_Dragon_Tattoo',
  },
  {
    id: 302,
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554086139i/19288043.jpg',
    externalLink: 'https://www.goodreads.com/book/show/19288043-gone-girl',
  },
  {
    id: 303,
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597798677i/55019161.jpg',
    externalLink: 'https://www.goodreads.com/book/show/55019161-the-da-vinci-code',
  },
];

function GenreMysteryCrime() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books_mystery_crime')) || [];
    setBooks([...defaultBooks, ...storedBooks]);
  }, []);

  useEffect(() => {
    const userAddedBooks = books.filter(book => book.id > 1000);
    localStorage.setItem('books_mystery_crime', JSON.stringify(userAddedBooks));
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
        Mystery & Crime
      </h2>
      <p style={{ color: '#555', textAlign: 'center', marginBottom: '1.5rem' }}>
        Explore books in the Mystery & Crime genre.
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

export default GenreMysteryCrime;
