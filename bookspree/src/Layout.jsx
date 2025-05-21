import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Bookspree</h1>
        <nav>
          <ul className="flex space-x-4 mt-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/reviews" className="hover:underline">Reviews</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow p-4">
        {/* Render the child routes here */}
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 Bookspree. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
