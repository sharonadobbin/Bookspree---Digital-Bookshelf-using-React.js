import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import NotFound from './pages/NotFound';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GenreSearch from './pages/GenreSearch';
import GenreRomanceFantasy from './pages/GenreRomanceFantasy';
import GenreChildrensLiterature from './pages/GenreChildrensLiterature';
import GenreHorror from './pages/GenreHorror';
import GenreMysteryCrime from './pages/GenreMysteryCrime';
import GenreNonFictionBiographies from './pages/GenreNonFictionBiographies';
import GenreFantasy from './pages/GenreFantasy';

function App() {
  return (
    <Routes>
      {/* Wrap routes with Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="book/:id" element={<BookDetail />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="genre-search" element={<GenreSearch />} />
        <Route path="genre/romance-fantasy" element={<GenreRomanceFantasy />} />
        <Route path="genre/childrens-literature" element={<GenreChildrensLiterature />} />
        <Route path="genre/horror" element={<GenreHorror />} />
        <Route path="genre/mystery-crime" element={<GenreMysteryCrime />} />
        <Route path="genre/non-fiction-biographies" element={<GenreNonFictionBiographies />} />
        <Route path="genre/fantasy" element={<GenreFantasy />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
