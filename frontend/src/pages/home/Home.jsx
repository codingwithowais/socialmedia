import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Leftbar from '../../components/leftbar/Leftbar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
import './home.css'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
    <Topbar/>
    <div className="homeContainer">
    <Leftbar/>
    <Feed/>
    <Rightbar/>
    </div>
    </>
  )
}
