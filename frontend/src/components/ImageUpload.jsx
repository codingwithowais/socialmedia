import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("media", image);

    try {
      const token = localStorage.getItem("token"); // Replace with your token retrieval logic

      const response = await axios.post("http://localhost:8800/api/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Upload successful:", response.data);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error.response || error.message);
      alert("Failed to upload image.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
};

export default ImageUpload;
