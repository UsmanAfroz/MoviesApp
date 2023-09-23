import React from 'react'
import { useState } from 'react';
import "./Login.css"
import { auth } from './Firebase';
import { login } from './features/userSlice';
import {  useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = () => {

 

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
   const dispatch=useDispatch();

   const loginToApp=(e)=>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password).then((userAuth)=>{
      dispatch(
        login({
          email:userAuth.user.email,
          uid:userAuth.user.uid,
          displayName:userAuth.user.displayName,
          
        })
      );
    }).catch((error)=> alert(error));
        
      
   };

   const Register=()=> {
    if(!name){
      return alert("Please Enter a full Name")

    }

    auth.createUserWithEmailAndPassword(email,password).then(
      (userAuth)=>userAuth.user.updateProfile({
        displayName:name,
      }).then(()=>{
        dispatch(login(
          {
            email:userAuth.user.email,
            uid:userAuth.user.uid,
            displayName:name,
            
          }
        ));
      })
    ).catch((error)=>alert(error));


   }



  return (
    <div className='login'>
    <img src="https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80" alt='img'/>


    <form>
    <input value={name } onChange={(e) =>{setName(e.target.value)}}
    type='text' 
    placeholder='Full Name(required if registering)'/>
    
    <input 
    value={email} onChange={(e)=> {setEmail(e.target.value)}}
     type='text' 
     placeholder='email' />
    <input 
    value={password} onChange={(e)=> {setPassword(e.target.value)}}
    type='password' 
    placeholder='password' />


    <button onClick={loginToApp}>Sign in</button>

    <p className='login-member'>Not a member?
    <span className="login-register"onClick={Register}>Register Now</span>
    </p>
    </form>
  </div>
  )
}

export default Login;