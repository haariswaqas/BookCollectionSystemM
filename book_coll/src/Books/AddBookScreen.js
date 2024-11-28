import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // For routing
import 'bootstrap/dist/css/bootstrap.min.css';

const AddBookScreen = () => {
  const { id } = useParams(); // Get the book ID (if editing)
  const navigate = useNavigate(); // Navigation
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [yearPublished, setYearPublished] = useState('');
  const [copiesLeft, setCopiesLeft] = useState('');
  const [genre, setGenre] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/genres');
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const result = await response.json();
        setGenres(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchBookDetails = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:3000/books/${id}`);
          if (!response.ok) {
            throw new Error(`Error fetching book details: ${response.statusText}`);
          }
          const book = await response.json();
          setTitle(book.title);
          setAuthor(book.author);
          setYearPublished(book.publishedYear);
          setCopiesLeft(book.copies_left);
          setGenre(book.genre_id);
          setImageURL(book.image);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchGenres();
    fetchBookDetails();
  }, [id]);

  const createOrUpdateBook = async () => {
    const bookDetails = {
      title,
      author,
      publishedYear: yearPublished,
      copies_left: copiesLeft,
      genre_id: genre,
      image: imageURL,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/books/${id || ''}`,
        {
          method: id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookDetails),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${id ? 'update' : 'create'} book: ${response.statusText}`);
      }

      alert(`Book ${id ? 'updated' : 'added'} successfully!`);
      navigate('/');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createOrUpdateBook();
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ borderRadius: '10px', backgroundColor: '#f5f5f5' }}>
        <h1 className="text-center text-primary mb-4" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px' }}>{id ? 'Edit Book' : 'Add New Book'}</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
            <label htmlFor="title" className="form-label" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              Title
            </label>
            <input
              id="title"
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
            <label htmlFor="author" className="form-label" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              Author
            </label>
            <input
              id="author"
              type="text"
              className="form-control"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
            <label htmlFor="yearPublished" className="form-label" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              Year Published
            </label>
            <input
              id="yearPublished"
              type="number"
              className="form-control"
              value={yearPublished}
              onChange={(e) => setYearPublished(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
            <label htmlFor="copiesLeft" className="form-label" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              Copies Left
            </label>
            <input
              id="copiesLeft"
              type="number"
              className="form-control"
              value={copiesLeft}
              onChange={(e) => setCopiesLeft(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
            <label htmlFor="genre" className="form-label" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              Genre
            </label>
            {loading ? (
              <p>Loading genres...</p>
            ) : error ? (
              <p className="text-danger">Error: {error}</p>
            ) : (
              <select
                id="genre"
                className="form-select"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              >
                <option value="">Select a genre</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
            <label htmlFor="imageURL" className="form-label" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              Book Image URL
            </label>
            <input
              id="imageURL"
              type="text"
              className="form-control"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div className="d-grid" style={{ marginTop: '20px' }}>
            <button type="submit" className="btn btn-success" style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', border: 'none', color: 'white', fontWeight: 'bold' }}>
              {id ? 'Update Book' : 'Submit Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookScreen;
