import React, { useState } from 'react';

const AddBookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [link, setLink] = useState('');
  const [shelf, setShelf] = useState('read');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !link) return;

    const newBook = {
      title,
      author,
      link,
      shelf,
    };

    onAddBook(newBook);
    setTitle('');
    setAuthor('');
    setLink('');
    setShelf('read');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', textAlign: 'center' }}>
      <h3 style={{ color: '#9E122C', fontWeight: 'bold', marginBottom: '1rem' }}>Add a Book</h3>
      <input
        type="text"
        placeholder="Book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ marginRight: '1rem', padding: '0.5rem', width: '200px' }}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        style={{ marginRight: '1rem', padding: '0.5rem', width: '200px' }}
      />
      <input
        type="url"
        placeholder="Goodreads link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
        style={{ marginRight: '1rem', padding: '0.5rem', width: '200px' }}
      />
      <select
        value={shelf}
        onChange={(e) => setShelf(e.target.value)}
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      >
        <option value="read">Read</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="didNotFinish">Did Not Finish</option>
      </select>
      <button
        type="submit"
        style={{
          backgroundColor: '#9E122C',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
