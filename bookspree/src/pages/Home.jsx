import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1512820790803-83ca734da794")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '4rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // white with transparency
          padding: '2rem',
          borderRadius: '12px',
          maxWidth: '600px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#9E122C', marginBottom: '1rem' }}>
          Welcome to Bookspree
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#333', marginBottom: '2rem' }}>
          Organize your favorite books and explore by genre.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <Link
            to="/signup"
            style={{
              backgroundColor: '#9E122C',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              color: '#fff',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            style={{
              backgroundColor: '#fff',
              color: '#9E122C',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              fontWeight: 'bold',
              textDecoration: 'none',
              border: '2px solid #9E122C',
            }}
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
