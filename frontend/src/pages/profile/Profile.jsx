import React, { useState , useEffect} from 'react'
import './profile.css'
import Topbar from '../../components/topbar/Topbar'
import Leftbar from '../../components/leftbar/Leftbar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
import {postContext} from '../../contexts/post/postContext'
import { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'


export default function Profile() {
  const {profileUser, currUser, loading, setLoading, setCurrUser, fetchPosts} = useContext(postContext);
  const [user, setUser] = useState({});
  const [admin , setAdmin] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
      setUser(profileUser);
      setAdmin(currUser);
      console.log(admin);
    },[profileUser, currUser]); // Only depends on `fetchUser`
    const updatePosts = async()=>{
      await fetchPosts();
    }
    const followHandle = async(e)=>{
      if(e.target.innerText === 'Follow'){
          try{
            const result = await axios.put(`http://localhost:8800/api/user/follow/${admin._id}` , {
              userId: user._id
            });
            setAdmin(result.data);
           setCurrUser(result.data);
           updatePosts();
           toast.success("Followed");
          }catch(err){
            console.log(err);
          }
      }
      else{
        try{
          const result = await axios.put(`http://localhost:8800/api/user/unfollow/${admin._id}` , {
            userId: user._id
          });
          setAdmin(result.data);
         setCurrUser(result.data);
         updatePosts();
         toast.success("Unfollowed");
        }catch(err){
          console.log(err);
        }
      }
    }
  return (
    <div>
      <Topbar />
      <div className="profileContainer">
        <Leftbar />
        {loading === false && <div className="rightProfile">
          <div className="rightProfileTop">
            <div className="profileCover">
              <img src={user.coverPic ? `http://localhost:8800${user.coverPic}`: "http://localhost:8800/uploads/unknown.png"} alt="" className="profileCoverPic" />
              <img src={user.profilePic ? `http://localhost:8800${user.profilePic}`: "http://localhost:8800/uploads/unknown.png"} alt="" className="profilePic" />
            </div>
            <div className="profileCoverInfo">
              <h1 className='profileUser'>{user.username ? user.username: "Nitish Kumar"}</h1>
              <span className="profileCoverDesc">{user.bio ? user.bio: "Hey! I am using Fakebook"}</span>
              <div className="updateContainer">
              {admin._id !== user._id && <button className="followBtn" onClick={followHandle}>{admin.following.includes(user._id) ? "Unfollow": "Follow"}</button>}
              {admin._id === user._id && <button className="editBtn" onClick={()=>navigate('/updateProfile')}>Edit your profile</button>}
              </div>
            </div>
          </div>
          <div className="rightProfileBottom">
            <div className="profileBottomLeft">
              <Feed />
            </div>
            <div className="profileBottomRight">
              <Rightbar profile/>
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}
