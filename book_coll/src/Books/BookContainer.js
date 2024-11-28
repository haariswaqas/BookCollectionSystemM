import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookContainer = ({ book }) => {
  return (
    <div className="card shadow-lg border-2 rounded-lg mb-5" style={{ maxWidth: '400px', backgroundColor: '#f5f5f5' }}>
      {/* Book Image */}
      <img 
        src={book.image} 
        alt="Book Cover" 
        className="card-img-top rounded-top" 
        style={{ height: '250px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} 
      />

      {/* Card Body */}
      <div className="card-body p-4">
        <h5 className="card-title text-center text-dark fw-bold mb-4">
          {book.title}
        </h5>
        <hr className="my-4 border-t border-gray-200" />
        <div className="mb-4">
          <p className="card-text mb-2">
            <span className="fw-bold">Author:</span> {book.author}
          </p>
          <p className="card-text mb-2">
            <span className="fw-bold">Year Published:</span> {book.publishedYear}
          </p>
          <p className="card-text mb-2">
            <span className="fw-bold">Genre:</span> {book.genre_id}
          </p>
          <p className="card-text">
            <span className="fw-bold">Copies Left:</span> {book.copies_left}
          </p>
        </div>
      </div>

      {/* Footer with Button */}
      
      </div>

  );
};

export default BookContainer;
