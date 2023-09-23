import React, { useEffect, useState } from 'react';
import './Favorites.css';
import { useSelector } from 'react-redux';
import { selectMovies } from './features/movieSlice';
import { db } from './Firebase';

function Favorites() {

 
  const movies = useSelector(selectMovies);

  const [favorites, setFavorites] = useState([]);



  // Fetch favorites data from Firestore when the component mounts

  useEffect(() => {
    
    const fetchFavorites = async () => {
      try {
        const response = await db.collection('addFavorites').get();
        const favoriteMovies = response.docs.map((doc) => ({ 
          id: doc.id,
          ...doc.data(),
        }));
        setFavorites(favoriteMovies);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites(); // Call the fetchFavorites function
  }, []); // Empty dependency array ensures it runs once on component mount



  const handleDeleteFromFavorites = async (movieId) => {
    try {
      // Delete the movie from Firestore using its ID
      await db.collection('addFavorites').doc(movieId).delete();

      // Remove the movie from the local favorites state
      const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
      console.log("id is:",movieId);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error deleting movie from favorites:', error);
    }
  };

  return (

    <div className='favorites'>

      <h1>Your Collection</h1>

      <div className='favorites-list'>

        {favorites.map((movie, index) => (

          <div className='favorites-card' key={index}>

            <h3>{movie.name}</h3>
            <img src={movie.imageUrl} alt={movie.name} />
            <p>{movie.year}</p>

            <button onClick={()=> handleDeleteFromFavorites(movie.id)}>Remove</button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
