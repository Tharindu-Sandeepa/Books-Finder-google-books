import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetail from './pages/BookDetailsPage';
import HomePage from './pages/HomePage';
import AppBar from './components/AppBar'; 
import Footer from './components/Footer';
import ShowBookListPage from './pages/ShowBookListPage';

const App = () => {
  return (
    <Router>
      <AppBar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/show-book-list" element={<ShowBookListPage />} />
      </Routes>
      <Footer /> 
    </Router>
  );
};

export default App;