import React, { useState, useContext, useEffect } from "react";
import "./updateprofile.css";
import {postContext} from '../../contexts/post/postContext'
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const {fetchUser} = useContext(postContext);
  const [imageForm, setImageForm] = useState({
    profilePic:null,
    coverPic: null
  });
  const [removeData, setRemoveData] = useState({
    removeProfilePic: false,
    removeCoverPic: false
  })
  const imageHandle = (e)=>{
    const {name, files} = e.target;
    setImageForm({...imageForm , [name]: files[0]});
  }
  const toggleCheck = (e)=>{
    const {name, checked} = e.target
    setRemoveData({...removeData , [name]: checked});
  }
  const [detailsData, setDetailsData] = useState({
    username: "",
    bio: "",
    city: "",
    hometown: "",
    relationStatus: "",
    qualification: "",
  });
  const fetchData = async()=>{
    const response = await fetchUser();
    setDetailsData({
      username: response.username? response.username: "",
      bio: response.bio? response.bio: "",
      city: response.city? response.city: "",
      hometown: response.hometown ? response.hometown : "",
      relationStatus: "",
      qualification: response.qualification ? response.qualification: "",
    })
  }
  useEffect(() => {
   fetchData();
  }, [])
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetailsData((prevData) => ({
      ...prevData,
      [name]: value, // Updates the specific key (like "relationship") with the new value
    }));
    console.log(detailsData.relationStatus);
  };
  


  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    if(imageForm.profilePic){
      formData.append('profilePic' , imageForm.profilePic);
    }
    if(imageForm.coverPic){
      formData.append('coverPic' , imageForm.coverPic);
    }
    formData.append('formData' , JSON.stringify(detailsData));
    formData.append('removeData' , JSON.stringify(removeData));
    console.log("Updated Profile Data:", formData);
    // Add your API call here to submit the updated data
    const token = localStorage.getItem('jwtToken');
    try{
      const result = await axios.put("http://localhost:8800/api/user/update" , formData, {
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": 'mutlitpart/form-data'
        }
      });
      console.log(result);
      toast.success("Profile Details Updated Successfully");
      navigate('/profile')

    }
    catch(err){
      console.log(err);
    }
  };

  return (
  
  <>

        {/* <div className="topBar">
            <Topbar/>
        </div> */}
    <div className="profile-update-container">
      <h2>Update Your Profile</h2>
      <form className="profile-update-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={detailsData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={detailsData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={detailsData.city}
            onChange={handleChange}
            placeholder="Enter your city"
          />
        </div>
        <div className="form-group">
          <label htmlFor="hometown">Hometown</label>
          <input
            type="text"
            id="hometown"
            name="hometown"
            value={detailsData.hometown}
            onChange={handleChange}
            placeholder="Enter your hometown"
          />
        </div>
        <div className="form-group">
          <label htmlFor="relationStatus">Relationship Status</label>
          <select
            id="relationStatus"
            name="relationStatus"
            onChange={(e)=>{ const { name, value } = e.target;
            setDetailsData((prevData) => ({
              ...prevData,
              [name]: value, // Updates the specific key (like "relationship") with the new value
            }));
            console.log(detailsData.relationStatus)}}
            value={detailsData.relationStatus}
          >
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="In a relationship">In a relationship</option>
            <option value="Married">Married</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="qualification">Qualification</label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            value={detailsData.qualification}
            onChange={handleChange}
            placeholder="Enter your qualification"
          />
        </div>
        <div className="form-group">
          <label htmlFor="profilePic">Profile Picture</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            onChange={imageHandle}
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label htmlFor="coverPic">Cover Picture</label>
          <input
            type="file"
            id="coverPic"
            name="coverPic"
            onChange={imageHandle}
            accept="image/*"
          />
        </div>
        {/* <div className="removeBtn">
        <button  className="removeProfileBtn">Remove Profile Picture</button>
        <button  className="removeCoverBtn">Remove Cover Picture</button>
        </div> */}
        <div class="form-group" style={{display:'flex' , alignItems: 'center'}}>
        <label for="removeProfilePic" style={{display:'inline'}}>Remove Profile Picture</label>
        <input type="checkbox" id="removeProfilePic"  name="removeProfilePic" style={{display:'inline'}} onChange={toggleCheck}/>
      </div>

      <div class="form-group" style={{display:'flex', alignItems:'center'}}>
        <label for="removeCoverPic" style={{display:'inline'}}>Remove Cover Picture</label>
        <input type="checkbox" id="removeCoverPic" name="removeCoverPic" style={{display:'inline'}} onChange={toggleCheck}/>
      </div>
        <button type="submit" className="submit-btn">Update Profile</button>
      </form>
    </div>
    </>
  );
};

export default ProfileUpdate;
