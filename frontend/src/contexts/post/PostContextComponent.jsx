import { postContext } from "./postContext";
import { useEffect , useState} from "react";
import axios from 'axios'
import { responsiveFontSizes } from "@mui/material";
export const PostContextComponent = ({children})=>{
    const name = "Owais";
    const [posts , setPosts] = useState([]);
    const [currUser, setCurrUser]  = useState({});
    const [loading, setLoading] = useState(true);
    // const [loading , setLoading] = useState(true);
    const [profileUser, setProfileUser] = useState({});
    const fetchPosts = async()=>{
        const token = localStorage.getItem('jwtToken');
        try{
            const result = await axios.get("http://localhost:8800/api/post/timelinePost" , {
                headers:{
                    Authorization: `Bearer ${token}`
                }
                
            })
            setPosts(result.data);
            console.log(result.data);
        }catch(err){
            console.log(err);
        }
    }
    const fetchUser = async()=>{
        const token = localStorage.getItem('jwtToken');
       try{
            const response = await axios.get('http://localhost:8800/api/auth/fetchuser' , {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setProfileUser(response.data);
            setCurrUser(response.data);
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchPosts();
        fetchUser();
        setLoading(false);
    },[]);
    return(
        <postContext.Provider value={{name, fetchPosts , posts, fetchUser, profileUser, setProfileUser, currUser, setCurrUser, loading , setLoading}}>
            {children}
        </postContext.Provider>
    )
}