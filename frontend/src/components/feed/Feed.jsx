import React, { useEffect, useState } from 'react'
import Share from '../../components/share/Share'
import Post from '../../components/post/Post'
import {Posts} from '../../dummyData';
import {postContext} from '../../contexts/post/postContext'
import './feed.css'
import {useContext} from 'react'

export default function Feed() {
  const {posts, fetchPosts} = useContext(postContext);
  const [currPosts, setCurrPosts] = useState([]);
  useEffect(()=>{
    setCurrPosts(posts);
  },[posts])
  return (
    <div>
      <div className="feedBar">
        <Share/>
        {currPosts.map((p)=>{
          return(
            <Post id = {p._id} post = {p}/>
          )
        })}
        {/* <Post/>
        <Post/>
        <Post/> */}
      </div>
    </div>
  )
}
