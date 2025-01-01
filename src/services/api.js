import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/',
});

export const fetchBooks = async (query) => {
  try {
    const response = await api.get(`volumes?q=${query}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await api.get(`volumes/${id}?&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

export default api;