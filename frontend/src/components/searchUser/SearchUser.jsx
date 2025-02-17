import React from 'react'
import './searchuser.css'
import { postContext } from '../../contexts/post/postContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchUser({ user }) {
  const navigate = useNavigate();
  const { setProfileUser, profileUser, fetchUser } = useContext(postContext);
 
  const clickHandle = () => {
    setProfileUser(user);
    console.log(profileUser);
    navigate('/profile');
  }

  return (
    <div>
      <li onClick={clickHandle}>
        <img
          src={user.profilePic ? `http://localhost:8800${user.profilePic}` : "http://localhost:8800/uploads/unknown.png"}
          alt="profile"
          className="profile-pic"
        />
        <span><b>
          {user.username}
        </b>
        </span>
      </li>
    </div>
  )
}
