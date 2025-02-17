import React from 'react'
import './friendlist.css'

export default function Friendlist({user}) {
  return (
    <div>
      <li className="friendListItems">
            <img src={user.profilePicture} alt="" className="freindPic" />
            <span className="freindName">{user.username}</span>
        </li>
    </div>
  )
}
