import React from 'react';
import { Link } from 'react-router-dom';

function GenreSearch() {
  const buttonStyle = {
    backgroundColor: '#9E122C',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    fontWeight: 'bold',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'background-color 0.3s ease',
    textAlign: 'center',
  };

  const buttonHoverStyle = {
    backgroundColor: '#7c0f24',
  };

  const genres = [
    { path: '/genre/romance-fantasy', label: 'Romance & Fantasy' },
    { path: '/genre/childrens-literature', label: "Children's Literature" },
    { path: '/genre/horror', label: 'Horror' },
    { path: '/genre/mystery-crime', label: 'Mystery & Crime' },
    { path: '/genre/non-fiction-biographies', label: 'Non-fiction & Biographies' },
    { path: '/genre/fantasy', label: 'Fantasy' },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#9E122C' }}>
        Search by Genre
      </h2>
      <p style={{ marginTop: '0.5rem', color: '#555' }}>
        Find books by your favourite genres.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
        }}
      >
        {genres.map((genre) => (
          <Link
            key={genre.path}
            to={genre.path}
            style={buttonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            {genre.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GenreSearch;
