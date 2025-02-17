import React from 'react'
import './register.css'
import { useState, useContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import {postContext} from '../../contexts/post/postContext'



export default function Register() {
  const {fetchUser, fetchPosts} = useContext(postContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const updateUser = async()=>{
    await fetchUser();
    await fetchPosts();
  }
  const registerHandle = async(e)=>{
      e.preventDefault();
      try{
        const response = await axios.post("http://localhost:8800/api/auth/register" , {username, email, password, cnfPassword});
        localStorage.setItem('jwtToken' , response.data.token);
        toast.success("Successfully Signed in");
        updateUser();
        navigate('/');
      }
      catch(err){
        if(err.message === "Confirm password does not match"){
            toast.error("Confirm password does not match");
        }
        else{
          toast.error("Unable to sign in");
        }
      }
  }
  return (
    <div>
       <div className="register">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h1 className="registerLogo">Fakebook</h1>
                <span className="registerDesc">Connects you across the world seamlessly</span>
            </div>
            <form className="registerRight" onSubmit={registerHandle}>
            <input type="text" placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}} className="registerEmail" />
                <input type="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}  className="registerEmail" />
                <input type="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}  className="registerPassword" />
                <input type="password" placeholder='Confirm Password' className="registerPassword" onChange={(e)=>{setCnfPassword(e.target.value)}}  />
                <button className='registerBtn'>Sign up</button>
                <span className="existUser" onClick={()=>{navigate('/login')}}>Already have an account?</span>
                <button className="loginBtn" onClick={()=>{navigate('/login')}}>Log in</button>
            </form>
        </div>
      </div>
    </div>
  )
}
