import React, { useContext, useEffect,useState } from 'react'
import './rightbar.css'
import Onlinefriends from '../onlineFriends/Onlinefriends'
import {Users} from '../../dummyData'
import userEvent from '@testing-library/user-event'
import { postContext } from '../../contexts/post/postContext'


export default function Rightbar({profile}) {
  const {profileUser} = useContext(postContext);
  const [user, setUser] = useState({});
  useEffect(()=>{
    setUser(profileUser);
  },[profileUser]);
  const ProfileComponent = ()=>{
    return(
      <div>
        <h1 className='userInfoTxt'>User Information</h1>
        <div className="usersInfo">
            <div className="userInfo">
              <span className="infoKey">City</span>
              <span className="infoVal">{user.city ? user .city: "London"}</span>
            </div>
            <div className="userInfo">
              <span className="infoKey">Hometown</span>
              <span className="infoVal">{user.hometown ? user.hometown: "Berlin"}</span>
            </div>
            <div className="userInfo">
              <span className="infoKey">Relationship</span>
              <span className="infoVal">{user.relationStatus?user.relationStatus: "Single"}</span>
            </div>
            <div className="userInfo">
              <span className="infoKey">Qualification</span>
              <span className="infoVal">{user.qualification?user.qualification:"Bachelors"}</span>
            </div>
        </div>
        <div className="mutualFriendContainer">
          <h1 className="mutualTxt">Mutual Friends</h1>
          <div className="mutualFriends">
            <div className="mutualFriend">
              <img src="./assets/person/7.jpeg" alt="" className="mutualPic" />
              <span className="mutualName">Greg Tarzan</span>
            </div>
            <div className="mutualFriend">
              <img src="./assets/person/6.jpeg" alt="" className="mutualPic" />
              <span className="mutualName">Skrillex</span>
            </div>
            <div className="mutualFriend">
              <img src="./assets/person/5.jpeg" alt="" className="mutualPic" />
              <span className="mutualName">Natasha Krovik</span>
            </div>
            <div className="mutualFriend">
              <img src="./assets/person/4.jpeg" alt="" className="mutualPic" />
              <span className="mutualName">Hilda Pimental</span>
            </div>
            <div className="mutualFriend">
              <img src="./assets/person/3.jpeg" alt="" className="mutualPic" />
              <span className="mutualName">Jami Carter</span>
            </div>
            <div className="mutualFriend">
              <img src="./assets/person/2.jpeg" alt="" className="mutualPic" />
              <span className="mutualName">James Doe</span>
            </div>
            <div className="mutualFriend">
              <img src="./assets/person/1.jpeg" alt="" className="mutualPic" />
              <span className="mutualName">Nadine Kumler</span>
            </div>
            <div className="mutualFriend">
              <img src="./assets/person/8.jpeg" alt="" className="mutualPic" />
              <span className="mutualName">Hayley Atwell</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const HomeComponent = ()=>{
    return (
      <>
      <div className="birthdayContainer">
      <img src="./assets/gift.png" alt="" className="giftImg" />
      <span className='birhtdayText'><b>Allan Walkins</b> and <b>3 others</b> have a birthday today</span>
    </div>
  <img src="./assets/ad2.jpg" alt="" className="advertisementImg" />
  <span className="advertisementText">Buy this bike now</span>
  <h2 className='onlineFriends'>Online Friends</h2>
  <ul className="friendList">
    {Users.map(u=>{
      return(
        <Onlinefriends key={u.id} user={u}/>
      )
    })}
  </ul>
  </>
    )
  }
  return (
    <div>
    <div className="rightBar">
      <div className="rightWrapper">
        {profile ? <ProfileComponent/> : <HomeComponent/>}
      </div>
    </div>
    </div>
    
  )
}
