import React from 'react';

const QuoteCard = ({ text, author, image }) => {
  return (
    <div className="quote-card border rounded-lg p-4 shadow-lg">
      <img src={image} alt={author} className="w-16 h-16 rounded-full mb-4 mx-auto"/>
      <p className="text-lg italic text-center mb-2">“{text}”</p>
      <p className="text-center text-sm font-semibold">{author}</p>
    </div>
  );
};

export default QuoteCard;