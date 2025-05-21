// src/layouts/Layout.jsx
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header/Navbar */}
      <nav
        style={{
          backgroundColor: '#9E122C',
          color: '#FFFFFF',
          padding: '1rem 2rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Title on the left */}
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Bookspree</h1>

        {/* Nav links on the right */}
        <ul
          style={{
            display: 'flex',
            gap: '1.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link to="/" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 'bold' }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 'bold' }}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/login" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 'bold' }}>
              Login
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main style={{ flexGrow: 1, padding: '1.5rem' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#FCECDF',
          color: '#9E122C',
          textAlign: 'center',
          padding: '1rem',
          borderTop: '1px solid #ccc',
        }}
      >
        <p>&copy; 2025 Bookspree. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
