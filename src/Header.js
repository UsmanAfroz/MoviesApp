import React from "react"
import { NavLink } from 'react-router-dom';

import { auth } from "./Firebase";
import { useDispatch } from "react-redux";
import { logout } from "./features/userSlice";
import "./Header.css";



const Header = () => {

    const dispatch=useDispatch()
    const logoutOfApp=()=>{
        dispatch(logout());
        auth.signOut();
    };
  
    return (

        <nav className="navbar">
        <div className="header-container">
    
           

            <div className="nav-elements">
                <ul>
                    <li>

                        <NavLink to="/">Home </NavLink>
                    </li>

                    <li>

                        <NavLink to="/MovieList">Movies </NavLink>
                    </li>

                    <li>

                        <NavLink to="/addFavourites"> Favourites</NavLink>

                    </li>


                    <li>
                        <NavLink to="/Favorites">Collection </NavLink>
                    </li>
                    <li>

                        <NavLink to="/AddMovies">Add Collection </NavLink>
                    </li>

                   
                    <li>
                     <NavLink to="/Login">Login</NavLink>
                    </li>

                    
                    <li>
                     <NavLink onClick={logoutOfApp} to="/Logout">LogOut</NavLink>
                    </li>
                </ul>

            </div>

            </div>
        </nav>
    )
}

export default Header;