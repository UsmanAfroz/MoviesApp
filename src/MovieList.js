import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MovieList.css"
import { useNavigate} from 'react-router-dom';

const MovieList = (props) => {

    const handleAddToFavorites= (movie)=>{
		props.handleFavouritesClick(movie);
	}
	const navigate=useNavigate();



	const handlebackword=()=>{
     navigate(-1);
	}


	return (
   <>
        
			<div className='row'>

			{props.movies.map((movie, index) => (
				<div className='image-container image-effect'>
 
				
				<img src={movie.Poster} alt='movie'></img>

				<div onClick=
				
				{  
					
					()=> { handleAddToFavorites(movie);
					alert("Movie Added to favorites");
					}
				} 
				className='add-favorites overlay'> 
			 	 
			          Add Favorite
				</div>


				
				</div>
              
			
			))}


            </div>

		
            <div className='goBack-button'>
			<button  onClick={handlebackword} className='backButton'>
			Previous
			</button>
			</div>
			
			
			

			<div className="space-x">
			
			</div>

   
			</>

		
           
		
	);
}

export default MovieList;