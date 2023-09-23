import React from 'react';
import "./AddFavourites.css";

function AddFavorites({ favoriteMovies, removeFavorites }) {
  // Check if favoriteMovies is null or an empty array
  if (!favoriteMovies || favoriteMovies.length === 0) {
    return (
      <div>
        <h1>Favorites</h1>
        <p>No favorite movies yet.</p>
      </div>
    );
  }

  const handleRemoveClick = (movie) => {
    removeFavorites(movie);
  }

  return (
    <div>
      <h1>Favorites</h1>
      <div className='row'>
        {favoriteMovies.map((movie, index) => (
          <div className='image-container image-effect' key={index}>
            <img src={movie.Poster} alt='movie' />
            <div onClick={() => handleRemoveClick(movie)} className='removeFavorites overlay'>
              Remove
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddFavorites;
