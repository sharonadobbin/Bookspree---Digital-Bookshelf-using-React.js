import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const defaultBooks = [
  {
    id: 201,
    title: 'Dracula',
    author: 'Bram Stoker',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1387151694i/17245.jpg',
    externalLink: 'https://www.goodreads.com/book/show/17245.Dracula?ac=1&from_search=true&qid=ZTspwDq4k1&rank=1',
  },
  {
    id: 202,
    title: 'The Shining',
    author: 'Stephen King',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353277730i/11588.jpg',
    externalLink: 'https://www.goodreads.com/book/show/11588.The_Shining?from_search=true&from_srp=true&qid=xMorlrLRwn&rank=1',
  },
  {
    id: 203,
    title: 'Bird Box',
    author: 'Josh Malerman',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1570393096i/44646576.jpg',
    externalLink: 'https://www.goodreads.com/book/show/44646576-bird-box?ref=nav_sb_ss_4_4s',
  },
];

function GenreHorror() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books_horror')) || [];
    setBooks([...defaultBooks, ...storedBooks]);
  }, []);

  useEffect(() => {
    const userAddedBooks = books.filter(book => book.id > 1000);
    localStorage.setItem('books_horror', JSON.stringify(userAddedBooks));
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
          color: '#9E122C', // deep red matching Romance & Fantasy
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        Horror
      </h2>
      <p style={{ color: '#555', textAlign: 'center', marginBottom: '1.5rem' }}>
        Explore books in the Horror genre.
      </p>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: '#9E122C', // deep red
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
              backgroundColor: '#9E122C', // deep red
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

export default GenreHorror;
