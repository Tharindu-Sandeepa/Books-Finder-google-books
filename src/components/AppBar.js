import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchBooks } from '../services/api';
import quotes from '../data/quotes';
import Logo from '../assets/bookfinder.png';

const AppBar = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (isHomePage) {
      const interval = setInterval(() => {
        setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isHomePage]);

  const searchBooks = async () => {
    if (!query.trim()) return; 

    setLoading(true);
    try {
      const results = await fetchBooks(query);
      navigate('/show-book-list', { state: { books: results || [] } });
    } catch {
      navigate('/show-book-list', { state: { books: [] } });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isHomePage) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

  return (
    <div
      className={`transition-all z-50 ${
        isHomePage
          ? 'relative bg-white shadow-sm'
          : isScrolled
          ? 'fixed top-0 left-0 w-full backdrop-blur-md bg-white/80 shadow-md'
          : 'fixed top-0 left-0 w-full bg-white shadow-sm'
      }`}
    >
      <div className="p-4 flex justify-between items-center max-w-6xl mx-auto">
      <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-blue-500 text-2xl lg:text-3xl font-bold">
            Book Finder
          </h1>
        </div>

        {!isHomePage && (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search for books..."
              className="border border-gray-300 rounded-full px-4 py-2 w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={searchBooks}
              className="bg-blue-500 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-full hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        )}

        {isHomePage && (
          <div
            className="hidden lg:flex items-center space-x-4 px-6 py-4 rounded-lg"
            style={{
              width: '500px',
              height: '100px',
              transform: 'translateX(20px)',
            }}
          >
            <img
              src={quotes[quoteIndex].image}
              alt={quotes[quoteIndex].author}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-base text-gray-700 leading-snug">
                {`"${quotes[quoteIndex].text}"`}
              </p>
              <p className="text-sm text-gray-500 mt-2 text-right">
                — {quotes[quoteIndex].author}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;
