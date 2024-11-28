import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import navigate hook for routing
import BookContainer from "./BookContainer";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ListBooks = () => {
    const [data, setData] = useState([]); // Initialize as an empty array
    const [genres, setGenres] = useState([]); // State to store genres
    const [filteredData, setFilteredData] = useState([]); // State to store filtered books
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(''); // Selected genre for filtering
    const navigate = useNavigate(); // Hook for navigation

    // Fetch all genres from the API
    const fetchGenres = async () => {
        const apiUrl = "http://localhost:3000/genres"; // Replace with your API URL
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setGenres(result); // Store the genres
        } catch (err) {
            setError(err.message);
        }
    };

    // Fetch all books from the API
    const fetchData = async () => {
        const apiUrl = "http://localhost:3000/books"; // Fetch all books
        
        try {
            setLoading(true);
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setData(result); // Store the books
            setFilteredData(result); // Initially, show all books
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Filter books based on selected genre
    const handleGenreChange = (event) => {
        const genreId = event.target.value;
        setSelectedGenre(genreId);

        // Filter books by genre
        if (genreId) {
            const filteredBooks = data.filter(book => book.genre_id === parseInt(genreId));
            setFilteredData(filteredBooks);
        } else {
            setFilteredData(data); // Show all books if no genre is selected
        }
    };

    // Handle Edit button click
    const handleEdit = (id) => {
        navigate(`/edit-book/${id}`);
    };

    // Handle Delete button click
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this book?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3000/books/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Failed to delete book: ${response.statusText}`);
                }

                // Remove the deleted book from the state without refetching the entire list
                setFilteredData((prevData) => prevData.filter((book) => book.id !== id));
                alert('Book deleted successfully!');
            } catch (err) {
                alert(`Failed to delete book: ${err.message}`);
            }
        }
    };

    useEffect(() => {
        fetchGenres(); // Fetch genres on initial load
        fetchData(); // Fetch books on initial load
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary mb-4">Featured Books</h1>

            <div className="row">
                <div className="col-md-12">
                    <label className="form-label">
                        Filter by Genre:
                        <select
                            className="form-select"
                            value={selectedGenre}
                            onChange={handleGenreChange}
                        >
                            <option value="">All Genres</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">Error: {error}</p>}
            {filteredData.length > 0 ? (
                <div className="row">
                    {filteredData.map((book) => (
                        <div key={book.id} className="col-md-4 mb-4">
                            <div className="card">
                                <BookContainer book={book} />
                                <div className="card-footer">
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => handleEdit(book.id)}>
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => handleDelete(book.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No books available.</p>
            )}
        </div>
    );
};

export default ListBooks;
