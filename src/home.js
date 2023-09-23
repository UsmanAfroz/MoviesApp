import React from "react";
import "./Home.css"
import home from "./images/home.png";
import { Link, NavLink } from 'react-router-dom';
import corner from "./images/corner.png";
import trailer from "./images/trailer.png";
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate=useNavigate();

  const handleClick=()=>{
     navigate('/MovieList');
  }

  // const GoForward = () => {
    
  //    navigate(1);
  // }

  
  return (

    <div className="home">

    <div className="images-container">
    <div>
      <img className="homeImg" src={home} alt="pic" />
    </div>
  
    <div>

      <img className="corner" src={corner} alt="pic" />

    </div>

  </div>

      <div className="home-img">
      <img className="trailer" src={trailer} alt="pic" />
      </div>

      

   

 
   
        <button onClick={handleClick} className="browseButton">Browse Movies</button>
      
   

<div className="spacer"></div>

   
</div>




  );
}

export default Home;
