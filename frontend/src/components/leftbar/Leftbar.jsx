import React from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import GroupsIcon from '@mui/icons-material/Groups';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import {Users} from '../../dummyData'
import Friendlist from '../friendList/Friendlist'
import './leftbar.css'

export default function Leftbar() {
  return (
    <div>
    <div className="leftBar">
      <div className="leftBarWrapper">
        <ul className="leftBarList">
          <li className="leftBarListItems">
            <ChatIcon className='leftBarListIcon'/>
            <span className='leftBarListText'>Chat</span>
          </li>
          <li className="leftBarListItems">
            <VideoSettingsIcon className='leftBarListIcon'/>
            <span className='leftBarListText'>Videos</span>
          </li>
          <li className="leftBarListItems">
            <GroupsIcon className='leftBarListIcon'/>
            <span className='leftBarListText'>Groups</span>
          </li>
          <li className="leftBarListItems">
            <BookmarksIcon className='leftBarListIcon'/>
            <span className='leftBarListText'>Bookmarks</span>
          </li>
          <li className="leftBarListItems">
            <WorkIcon className='leftBarListIcon'/>
            <span className='leftBarListText'>Jobs</span>
          </li>
          <li className="leftBarListItems">
            <EventIcon className='leftBarListIcon'/>
            <span className='leftBarListText'>Events</span>
          </li>
          <li className="leftBarListItems">
            <SchoolIcon className='leftBarListIcon'/>
            <span className='leftBarListText'>Courses</span>
          </li>
        </ul>
        <button className='leftBarBtn'>Show More</button>
        <hr className='leftBarhr' />
        <ul className="friendList">
          {Users.map((u)=>{
            return(
              <Friendlist key={u.id} user = {u}/>
            )
          })}
        </ul>
      </div>
    </div>
    </div>
    
  )
}

