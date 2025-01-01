import { useState, useEffect,useCallback } from 'react';
import { fetchBooks } from '../services/api';
import BookList from '../components/BookList';
// import quotes from '../data/quotes';
// import TypingEffect from '../components/TypingEffect';

const genres = [
  'Art', 'Biography', 'Business', "Children's", 'Christian', 'Classics',
  'Comics', 'Cookbooks', 'Ebooks', 'Fantasy', 'Fiction', 'Graphic Novels',
  'Historical Fiction', 'History', 'Horror', 'Memoir', 'Music', 'Mystery',
  'Nonfiction', 'Poetry', 'Psychology', 'Romance', 'Science', 'Science Fiction',
  'Self Help', 'Sports', 'Thriller', 'Travel', 'Young Adult'
];

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  // const [quoteIndex, setQuoteIndex] = useState(0);
  // const [typingCompleted, setTypingCompleted] = useState(false);
  const [activeGenre, setActiveGenre] = useState('Business'); // Default genre

  const searchBooks = useCallback(async (searchQuery) => {
    setLoading(true);
    try {
      const results = await fetchBooks(searchQuery || query);
      setBooks(results || []);
      if (searchQuery) {
        setActiveGenre(searchQuery);
      }
    } catch {
      setBooks([]);
    }
    setLoading(false);
  }, [query]);

  useEffect(() => {
    searchBooks('Business');
  }, [searchBooks]);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col ">
      {/* Quote Section */}
      {/* <div className="absolute top-24 right-10 bg-white shadow-lg rounded-lg p-4 w-96">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={quotes[quoteIndex].image}
            alt={quotes[quoteIndex].author}
            className="w-12 h-12 rounded-full"
          />
          <p className="font-bold text-gray-800">{quotes[quoteIndex].author}</p>
        </div>
        <TypingEffect
          text={quotes[quoteIndex].text}
          delay={95}
          onComplete={() => setTypingCompleted(true)}
        />
      </div> */}

      
      <div className="p-6">


<div className="flex justify-center mb-8 space-x-2">
  <input
    type="text"
    placeholder="Search for books..."
    className="border border-gray-300 rounded-md p-3 w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
  <button
    onClick={() => searchBooks()}
    className="bg-blue-500 text-white p-3 rounded-md shadow hover:bg-blue-600 transition"
    disabled={loading}
  >
    {loading ? 'Searching...' : 'Search'}
  </button>
</div>

       
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            Browse by Genre
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => searchBooks(genre)}
                className={`px-4 py-2 rounded-full shadow transition ease-in-out ${
                  activeGenre === genre
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

       
        <BookList books={books} />
      </div>
    </div>
  );
};

export default HomePage;