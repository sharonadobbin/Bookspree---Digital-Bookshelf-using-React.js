// src/pages/BookDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1650033243i/41733839.jpg',
    description: 'A classic novel about the American dream.',
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1612238791i/56916837.jpg',
    description: 'A novel about racial injustice in the Deep South.',
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    description: 'A dystopian novel about totalitarianism.',
  },
];

function BookDetail() {
  const { id } = useParams();
  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-3xl font-bold text-red-600">Book not found</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '1rem', color: '#9E122C' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{book.title}</h2>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>By {book.author}</h3>
      <img
        src={book.cover}
        alt={book.title}
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }}
      />
      <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>{book.description}</p>
    </div>
  );
}

export default BookDetail;
