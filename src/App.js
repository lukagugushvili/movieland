import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=6e34d407";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMoves = async (title) => {
    try {
      const res = await fetch(`${API_URL}&s=${title}`);
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      const data = await res.json();
      setMovies(data.Search);
    } catch (error) {
      console.error("error => ", error);
    }
  };

  useEffect(() => {
    searchMoves("Search");
  }, []);

  const handleSearchMovie = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      searchMoves(searchTerm);
    }
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchMovie}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movies) => (
            <MovieCard movies={movies} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
