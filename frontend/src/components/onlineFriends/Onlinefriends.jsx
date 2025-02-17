import React from 'react'
import './onlinefriends.css';

export default function Onlinefriends({user}) {
  return (
    <div>
         <li className="friendItem">
          <div className="friendContainer">
            <img src={user.profilePicture} alt="" className="freindPic" />
            <div className="onlineIcon"></div>
          </div>
          <span className="friendName">{user.username}</span>
        </li>
    </div>
  )
}
