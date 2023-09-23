import React, { useState } from 'react'
import "./AddMovies.css";
import {addMovies} from './features/movieSlice';
import { useDispatch } from 'react-redux';
import { db } from './Firebase';


function AddMovies() 
{
   
    //  const [form, setForm]=useState({
    //   name:"",
    //   year:"",
    //  })

    const dispatch=useDispatch();

      const [name,setName]=useState('');
      const [imgUrl, setImgUrl]=useState('');
      const [year,setYear]=useState('');
     
     const handleSubmit=(e)=>{
       e.preventDefault();
 
       const newMovie={
        name:name,
        imageUrl:imgUrl,
        year:year
       };

       dispatch(addMovies(newMovie));

       saveMovieToFirestore(newMovie);

       setName('');
       setImgUrl('');
       setYear('');

     };

     const saveMovieToFirestore = async (movie) => {
      try {
        await db.collection('addFavorites').add({
          name: movie.name,
          imageUrl: movie.imageUrl,
          year: movie.year,
        });
  
        console.log('Movie added to Firestore: ', movie);
      } catch (error) {
        console.error('Error adding movie to Firestore:', error);
      }
    };
    
    

  return (
    <div className='movies-form'>

    <h1 className='addMovies-heading'>Add Movies</h1>
   
    <form onSubmit={handleSubmit}>
    
    <input 
    type='text' 
    placeholder='Enter Movie name'
     value={name}
      onChange={(e)=> setName(e.target.value)} 
      />

    <input 
    type="text"  
    placeholder='Enter Image Url'
     value={imgUrl} 
     onChange={(e)=> setImgUrl(e.target.value)} 
     />
    <input 
    type='text' 
    placeholder='Enter Year' 
    value={year} 
    onChange={(e)=> setYear(e.target.value)} 
    />
     <button onClick={()=>{
      alert("Movie Added to Collection");
     }} className="add-button" type='submit'>Add</button>
    
     </form>

    </div>
  )
  }

export default AddMovies;
