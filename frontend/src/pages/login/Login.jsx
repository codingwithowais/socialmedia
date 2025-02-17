import React, { useContext } from 'react'
import './login.css'
import {useState} from'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'
import {postContext} from '../../contexts/post/postContext'
export default function Login() {
  const navigate = useNavigate();
  const[email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {fetchUser, fetchPosts} = useContext(postContext);
  const updateDetails = async()=>{
    await fetchUser();
    await fetchPosts();
  }
  const loginHandler = async(e)=>{
      e.preventDefault();
      try{
        const response = await axios.post('http://localhost:8800/api/auth/login' , {email, password});
        localStorage.setItem('jwtToken', response.data.token);
        updateDetails();
        navigate('/');
        toast.success("Signed in successfully");
      }
      catch(err){
        toast.error("Invalid Credentials");
      }
  }
  return (
    <div>
      <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h1 className="loginLogo">Fakebook</h1>
                <span className="loginDesc">Connects you across the world seamlessly</span>
            </div>
            <form className="loginRight" onSubmit={loginHandler}>
                <input type="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}className="loginEmail" />
                <input type="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}className="loginPassword" />
                <span className="forgotTxt">Forgot Password?</span>
                <button className='loginBtn'>Log in</button>
                <button className="registerBtn" onClick={()=>{navigate('/register')}}>Create a new account</button>
            </form>
        </div>
      </div>
    </div>
  )
}
