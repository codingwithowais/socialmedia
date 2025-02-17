import React, { useEffect, useState , useRef, useContext} from 'react'
import './share.css'
import CollectionsIcon from '@mui/icons-material/Collections';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import axios from 'axios'
import {postContext} from '../../contexts/post/postContext'



export default function Share() {
  const [profileStyle, setProfileStyle] = useState(null);
  const [postStyle, setPostStyle] = useState(null);
  const formRef = useRef(null);
  const postFormRef = useRef(null);
  const [image, setImage] = useState(null);
  const [postDesc, setPostDesc] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [postImageName, setPostImageName] = useState(null);
  const {fetchPosts, currUser}  = useContext(postContext);
  // Displaying the form to upload image
  const formHandle = (e)=>{
    console.log("Clicked");
    if(formRef.current){
      formRef.current.style.display = "block";
      setProfileStyle({
          display: 'none'
      })
    }
  }
  const postFormHandle = ()=>{
    if(postFormRef.current){
      postFormRef.current.style.display = 'block'
    }
    setPostStyle({
      display: 'none'
    })
  }
// Selecting files to upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePostImageChange = (e)=>{
    setPostImage(e.target.files[0]);
  }

  // Handle image upload form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      formRef.current.style.display = "none";
      setProfileStyle({dispaly:'inline'});
      return;
    }

    const formData = new FormData();
    formData.append("media", image);

    try {
      const token = localStorage.getItem("jwtToken"); // Replace with your token retrieval logic

      const response = await axios.post("http://localhost:8800/api/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("Upload successful:", response.data);
      alert("Image uploaded successfully!");
      formRef.current.style.display = 'none';
      setProfileStyle({
        display: 'inline'
      })
      setImage(null);
    } catch (error) {
      console.error("Error uploading image:", error.response || error.message);
      alert("Failed to upload image");
      setProfileStyle({
        display: 'inline'
      })
    }
  };

 



  const postSubmitHandle = async()=>{
    console.log(postImageName);
    const token = localStorage.getItem('jwtToken');
    try{
      const response = await axios.post("http://localhost:8800/api/post/addPost", {
        description: postDesc,
        picture: postImageName
      },{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
      }});
      console.log(response.data);
      fetchPosts();
    }
    catch(err){
      console.log(err);
    }
  }

  const postImageSubmitHandle = async()=>{
    formRef.current.style.display = 'none';
    console.log(postImage);
    setPostStyle({display:'flex'});
    if (!postImage) {
      postSubmitHandle();
      return;
    }
    console.log(postImage);
    const formData = new FormData();
    formData.append("media", postImage);

    try {
      // Replace with your token retrieval logic

      const response = await axios.post("http://localhost:8800/api/post/uploadPostImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
     await setPostImageName(response.data.filePath);

      console.log("Upload successful:", response.data);
      // alert("Image uploaded successfully!");
      // setPostStyle({
      //   display: 'flex'
      // });
      postSubmitHandle();
    } catch (error) {
      console.error("Error uploading image:", error.response || error.message);
      alert("Failed to upload image");
    }
  }


  
  useEffect(()=>{
    
  }, []);
  return (
    <div>
      <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
            <div>
       <form onSubmit={handleSubmit} ref={formRef} style={{display:'none'}}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload Image</button>
      </form> 
    </div>
                <img src={currUser.profilePic !== ""?`http://localhost:8800${currUser.profilePic}`: `http://localhost:8800/uploads/unknown.png`} style={profileStyle} onClick={formHandle} alt="dp" className='shareTopImg'/>
                <input type="text" placeholder="What's in your mind?" value={postDesc} onChange={(e)=>{setPostDesc(e.target.value)}}className='shareTopText'/>
            </div>
            <hr className="shareTopHr" />
            <div className="shareBottom">
                <div className="shareBottomOptions">
                    <form  ref={postFormRef} style={{display:'none'}}>
        <input type="file" accept="image/*" onChange={handlePostImageChange} />
      </form>
                    <div className="shareBottomOption" style={postStyle} onClick={postFormHandle} >
                         
                        <CollectionsIcon style={{color:'#FF6347'}}/>
                        <span className="shareOptionText">Picture or Video</span>
                        
                    </div>
                    <div className="shareBottomOption">
                        <LocalOfferIcon style={{color: 'green'}}/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareBottomOption" style={{color:'blue'}}>
                        <LocationOnIcon/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareBottomOption" style={{color:'#DAA520'}}>
                        <EmojiEmotionsIcon/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
            </div>
                    <div className="buttonBox">
                    <button className="shareBtn" onClick={postImageSubmitHandle}>Share</button>
                    </div>
                </div>
        </div>
      </div>
    </div>
  )
}
