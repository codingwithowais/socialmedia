import React from 'react'
import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
// import {Users} from '../../dummyData'
import { useState } from 'react'
// import { postContext } from '../../contexts/post/postContext';
import axios from 'axios';
import {toast} from 'react-toastify'
import {formatDistanceToNow} from 'date-fns'
export default function Post({post, id}) {
  const [like, setLike] = useState(post.likes.length);
  const postTime = new Date(post.createdAt);
  const timeAgo = formatDistanceToNow(postTime , {addSuffix: true})
  const likeHandle = async()=>{
      const token = localStorage.getItem("jwtToken");
      console.log(token);
      try{
        const response = await axios.put(`http://localhost:8800/api/post/likes/${id}` , null , {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        toast.success("Hello World");
        console.log(response.data.message);
        setLike(response.data.result.likes.length);
      }catch(err){
          console.log(err);
      }
  }

  

  return (
    <div>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img src={post.profilePic ? `http://localhost:8800${post.profilePic}`: ""} alt="" className="postProfilePic" />
              <span className="postTopPerson">{post.username}</span>
              <span className='postLeftTime'>Posted {timeAgo}</span>
            </div>
            <div className="postTopRight">
              <MoreVertIcon style={{cursor:'pointer'}} />
            </div>
          </div>
          <div className="postCenter">
            <div className="postCaption">{post.description?post.description:""}</div>
            <img src={post.picture ? `http://localhost:8800${post.picture}`: ""} alt="" className='postCenterImg'/>
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img src="./assets/like.png" onClick={likeHandle} alt="" className="postBottomLike" />
              <img src="./assets/heart.png" onClick={likeHandle} alt="" className="postBottomHeart" />
              <span className="likeCounter">{like} people liked it</span>
            </div>
            <div className="postBottomRight">
              <CommentIcon className='postBottomComment'/>
              <span className="commentText">9 comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
