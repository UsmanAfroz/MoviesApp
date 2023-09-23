import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import SearchBox from "./SearchBox";
import MovieListHeading from "./MovieListHeading";
import AddMovies from "./AddMovies";
import Home from './home';
import Favorites from "./Favorites";
import Error from "./Error";


import axios from "axios";
import { auth } from "./Firebase";
import Login from "./Login";
import { selectUser } from './features/userSlice';
import { login, logout } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import Logout from "./Logout";
import { db } from "./Firebase";
import MovieList from "./MovieList";
import AddFavourites from "./AddFavourites";




function App() {
    

  const [searchValue, setSearchValue] = useState('');
  
  const [movies,setMovies]=useState([]);

  // const getMovies= async()=> {
  //   try{
 
  //     const {data} = await axios.get("https://api.themoviedb.org/3/movie/157336?api_key=323a806f9485d9a4670c826fa69ca643");
  //     setLatest(data);
  //   } catch(err){
  //     console.log(err);
  //   }
  // }

  // useEffect(()=>{
  //   getMovies()
  // },[])
 

  const getMoviesRequest = async(searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    const response =await fetch(url);
    const responseJson= await response.json();

    if(responseJson.Search){
      setMoviesList(responseJson.Search);
    }

  };

  useEffect(() =>{
    getMoviesRequest(searchValue);
  },[searchValue]
  );

  const getLocalMovieData = () => {
    const localMovieData = localStorage.getItem('movie-favorite');
    return localMovieData ? JSON.parse(localMovieData) : [];
  };
  
  const getLocalMovieListData = () => {
    let localMovieList = localStorage.getItem("movieList-items");
    if (localMovieList === null) {
      return [];
    } else {
      return JSON.parse(localMovieList);
    }
  };
  

  const [addFavorites,setAddFavorites]=useState(() => getLocalMovieData ());
  const [moviesList, setMoviesList] = useState(() => getLocalMovieListData());

  useEffect(()=>
  {
    localStorage.setItem("movieList-items",JSON.stringify(moviesList));
  },[moviesList]);
  

  useEffect(()=>{
    localStorage.setItem("movie-favorite",JSON.stringify(addFavorites))
  },[addFavorites]);


 
  const handleAddToFavorites= (movie) => {
    const addedFavorites=[...addFavorites, movie];

    setAddFavorites(addedFavorites);
    
  }

    const deleteFromFavorites = (movie) => {
      
      const deletedFavorites = addFavorites.filter((favoriteMovie) => favoriteMovie.imdbID !== movie.imdbID);
      console.log('Removing movie with ID:', movie.imdbID);
      
      setAddFavorites(deletedFavorites);
      // saveToLocalStorage(deletedFavorites);
    }


  const handleAddMovie = async (movie) => {
    try {
      await db.collection('addFavorites').add({
        name: movie.name,
        imageUrl: movie.imageUrl,
        year: movie.year,
      });
  
      alert('Movie added to Firestore: ', movie);
  
      setMovies([...movies, movie]);
    } catch (error) {
      console.error('Error adding movie to Firestore:', error);
    }
  };
 



  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
        }));

      }
      else {
        dispatch(logout());
      }
    });
  }, [dispatch]);


  return (

    

    <BrowserRouter>
    <div className="upper-app">
      <Header />
      <div className="app-body">
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
        
            <Route path="addFavourites" element={
              
              <AddFavourites

              favoriteMovies={addFavorites}
              removeFavorites={deleteFromFavorites}
              
              />} 
              
              />
            
          
       
            <Route path="Favorites" element={<Favorites
              />} />
              
            <Route path="MovieList" element={
              <>
                
                    <MovieListHeading heading='Movies' />
                    <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                
                 
                  <MovieList 
                  movies={moviesList} 
                  // favouriteComponent={AddFavourites}

                  handleFavouritesClick={handleAddToFavorites}

                  />
                  
                 
                
              </>
            } />
           
            
            <Route path="AddMovies" element={<AddMovies 
                 
              addMovies={handleAddMovie} 
              moviesList={movies}
             
              />} />
              
            <Route path="Login" element={<Login />} />
            <Route path="Logout" element={<Logout />} />
            <Route path="*" element={<Error />} />
          </Routes>
        )}
        <Footer />
      </div>
    </div>
  </BrowserRouter>
);
}


export default App;
