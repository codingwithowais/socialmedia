import React, {useContext, useState, useEffect} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import topbarStyling from './topbar.css'
import { useNavigate } from 'react-router-dom';
import { postContext } from '../../contexts/post/postContext';
import SearchUser from '../searchUser/SearchUser';
import axios from 'axios'
import _ from 'lodash';
export default function Topbar() {
    const {name , currUser} = useContext(postContext);
    const [userDetails, setUserDetails] = useState(null);
    const handleClick = ()=>{
        setSearchUsers([]);
        setQuery("");
    }
    useEffect(() => {
        
        
        setUserDetails(currUser);
      
    }, [])
    
    const navigate = useNavigate();
    const logoutHandle = ()=>{
        localStorage.removeItem('jwtToken');
        navigate('/login');
    }
    const [query, setQuery] = useState("");
    const [searchUsers, setSearchUsers] = useState([]);



    const handleSearch = async(e)=>{
        setQuery(e.target.value);
        const text = query.trim();
        if(e.target.value.trim() === ''){
            setSearchUsers([]);
            console.log(searchUsers.length);
            return;
        }
        try{
            const response = await axios.get('http://localhost:8800/api/user/search', {
                params: { username: text },
              });
              setSearchUsers(response.data);
        }
        catch(err){
            console.log(err);
        }
           
        }
  return (
    <>
    <div className="topBarContainer">
        <div className="topBarLeft">
            Fakebook
        </div>
        <div className="topBarCenter">
           <div className="searchBar">
            <SearchIcon className='searchIcon'/>
                <input type="search" placeholder='Search for friends here' onChange={handleSearch} value = {query} className="searchArea" />
                {searchUsers.length > 0 && (
        <ul className="results-list" onClick={handleClick}>
          {searchUsers.map((user) => (
           <SearchUser key={user._id} user={user}/>
          ))}
        </ul>
        )}

      </div>
</div>
        <div className="topBarRight">
            <div className="topRightFirst">
                <span onClick={()=>(navigate('/'))}>Home</span>
                <span onClick={logoutHandle}>Log Out</span>
            </div>
            <div className="topRightSecond">
                <div className="requestBadge">
                    <div className="badgeItem">
                    <span className="badgeCount">1</span>
                        <PersonIcon/>
                    </div>
                </div>
                <div className="notiBadge">
                <div className="badgeItem">
                        <span className='badgeCount'>2</span>
                        <NotificationsIcon/>
                </div>
                </div>
                <div className="msgBadge">
                <div className="badgeItem">
                        <span className="badgeCount">3</span>
                        <MessageIcon/>
                </div>
                </div>
                <img src={currUser.profilePic ? `http://localhost:8800${currUser.profilePic}`: "http://localhost:8800/uploads/unknown.png"} alt=''className='topbarImg' onClick={()=>(navigate('/profile'))}/>
            </div>
        </div>
    </div>
    </>
    )
}
