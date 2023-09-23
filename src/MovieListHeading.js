import React from 'react';
import "./MovieListHeading.css"

const MovieListHeading = (props) => {
	return (
		<div className='movieList-heading'>
			<h1>{props.heading}</h1>
		</div>
	);
};

export default MovieListHeading;