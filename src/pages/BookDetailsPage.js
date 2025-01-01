import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookById } from '../services/api';
import { FaUserCircle, FaCalendarAlt, FaLanguage, FaBook, FaTag } from 'react-icons/fa';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = React.useState(null);

  React.useEffect(() => {
    const getBookDetails = async () => {
      try {
        const bookData = await fetchBookById(id);
        setBook(bookData);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    getBookDetails();
  }, [id]);

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  const { 
    title, authors, publishedDate, description, 
    averageRating, categories, imageLinks, pageCount, 
    language, pdf, industryIdentifiers 
  } = book.volumeInfo;

  // Sanitize description
  const sanitizedDescription = description
    ? description
        .replace(/<br\s*\/?>/g, '\n')  // Replace <br> tags with newlines
        .replace(/<\/?[^>]+(>|$)/g, "") // Remove all HTML tags
    : 'No description available.';

  return (
    <div className="bg-gray-50 py-10 min-h-screen mt-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4"> {title} </h1>
        <div className="flex items-center mb-6">
          <div className="flex space-x-2 text-yellow-500 text-3xl">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(averageRating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="ml-2 text-gray-600 text-lg">
            {averageRating ? `(${averageRating}/5)` : 'No Ratings'}
          </span>
        </div>
        <p className="text-gray-600 text-lg">
          {book.volumeInfo.ratingsCount ? `${book.volumeInfo.ratingsCount.toLocaleString()} ratings` : 'No Ratings'} | 
          {book.volumeInfo.reviewCount ? `${book.volumeInfo.reviewCount.toLocaleString()} reviews` : 'No Reviews'}
        </p>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Book Image */}
          <div>
            <img
              src={imageLinks?.thumbnail}
              alt={title}
              className="w-full md:w-96 h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Book Details */}
          <div>
            <div className="mb-8">
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Author(s):</span> 
                {authors?.map((author, idx) => (
                  <span key={idx} className="flex items-center space-x-2">
                    <FaUserCircle className="text-gray-400 text-xl" />
                    <span>{author}{idx < authors.length - 1 ? ', ' : ''}</span>
                  </span>
                )) || 'Unknown'}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold flex items-center">
                  <FaCalendarAlt className="mr-2" /> Published Date:
                </span> 
                {publishedDate || 'N/A'}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold flex items-center">
                  <FaLanguage className="mr-2" /> Language:
                </span> 
                {language || 'N/A'}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold flex items-center">
                  <FaBook className="mr-2" /> Pages:
                </span> 
                {pageCount || 'N/A'}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold flex items-center">
                  <FaTag className="mr-2" /> Categories:
                </span> 
                <ul className="list-disc ml-6">
                  {categories?.map((category, idx) => (
                    <li key={idx} className="text-gray-600">
                      {category}
                    </li>
                  )) || 'N/A'}
                </ul>
              </p>
            </div>

            <div>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Description:</span>
                {sanitizedDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Details in a Table */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Additional Details</h2>
          <table className="table-auto w-full text-gray-600">
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold">This Edition:</td>
                <td className="border px-4 py-2">{title} (First Edition)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Format:</td>
                <td className="border px-4 py-2">Print</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Published:</td>
                <td className="border px-4 py-2">{publishedDate}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">ISBN:</td>
                <td className="border px-4 py-2">{industryIdentifiers?.[0]?.identifier || 'N/A'}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">ASIN:</td>
                <td className="border px-4 py-2">{industryIdentifiers?.[1]?.identifier || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex mt-10 space-x-4">
          {pdf?.isAvailable && (
            <a
              href={pdf.acsTokenLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Download Sample PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;