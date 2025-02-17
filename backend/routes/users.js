const mongoose = require("mongoose");
const user = require("../models/User");
const express = require("express");
const bcrypt = require("bcrypt");
const upload = require("../middlewares/mediaUploads");
const fetchuser = require("../middlewares/fetchuser");
const {
    strictTransportSecurity
} = require("helmet");

const router = new express.Router();
// To update users profile
router.put("/update", fetchuser, upload.fields([{name: 'profilePic'},{name: 'coverPic'}]),  async (req, res) => {
        const userData = JSON.parse(req.body.formData);
        const removeData = JSON.parse(req.body.removeData);
        const obj = {};
        if(userData.username){
            obj.username = userData.username
        }
        if(userData.bio){
            obj.bio = userData.bio;
        }
        if(req.files.profilePic){
            obj.profilePic =  `/uploads/${req.files.profilePic[0].filename}`;
            console.log(req.files.profilePic[0].filename);
        }
        else if(removeData.removeProfilePic){
            obj.profilePic = "";
        }
        if(req.files.coverPic){
            obj.coverPic =  `/uploads/${req.files.coverPic[0].filename}`;
            console.log(req.files.coverPic[0].filename);
        }
        else if(removeData.removeCoverPic){
            obj.coverPic = "";
        }
        if(userData.city){
            obj.city = userData.city;
        }
        if(userData.hometown){
            obj.hometown = userData.hometown;
        }
        if(userData.relationStatus){
        obj.relationStatus=userData.relationStatus;
        }
        if(userData.qualification){
            obj.qualification = userData.qualification;
        }
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(req.body.password, salt);
                req.body.password = hashPassword;
            } catch (err) {
                return res.status(500).send(err);
            }
        }
        try {
            const result = await user.findByIdAndUpdate(req.user.id, {
                $set: obj
            }, {
                new: true
            });
            console.log(result);
            res.status(201).send("Updated Successfully");

        } catch (err) {
            return res.status(500).send(err);
        }
    } 
);

// Deleting the users profile
router.delete("/delete/:id", async (req, res) => {
    if (req.body.userId == req.params.id || req.isAdmin) {
        try {
            const result = await user.findByIdAndDelete(req.params.id);
            console.log(result);
            res.status(201).send("Profile Deleted Successfully");

        } catch (err) {
            return res.status(500).send(err);
        }
    } else {
        res.status(404).send("Can not be deleted");
    }
});

// Following some other user
router.put("/follow/:id", async (req, res) => {
    if (req.params.id != req.body.userId) {
        try {
            const User = await user.findById(req.body.userId).select({password:0 , createdAt:0});
            const currUser = await user.findById(req.params.id);
            if (!currUser.following.includes(req.body.userId)) {

                await User.updateOne({
                    $push: {
                        followers: req.params.id
                    }
                });
               await currUser.updateOne({
                    $push: {
                        following: req.body.userId
                    }
                });
                const result = await user.findById(req.params.id);
                res.status(201).send(result);


            } else {
                res.status(404).send("You already follow this person");
            }
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.status(404).send("You can not follow yourself");
    }
});


// Unfollow a user
router.put("/unfollow/:id", async (req, res) => {
    if (req.params.id != req.body.userId) {
        try {
            const User = await user.findById(req.body.userId).select({password:0 , createdAt:0});
            const currUser = await user.findById(req.params.id);
            if (currUser.following.includes(req.body.userId)) {

                await User.updateOne( {
                    $pull: {
                        followers: req.params.id
                    }
                });
                await currUser.updateOne( {
                    $pull: {
                        following: req.body.userId
                    }
                });
                const result = await user.findById(req.params.id);
                res.status(201).send(result);

            } else {
                res.status(404).send("You do not follow this person");
            }
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.status(404).send("You can not unfollow yourself");
    }
});


router.post('/upload', upload.single('media'), fetchuser, async(req,res)=>{
    try {
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log('Uploaded File:', req.file);
        console.log('Request Body:', req.body);
    
        // File uploaded successfully
        // console.log(req.headers.authorization);
       const result  = await user.findByIdAndUpdate(req.user.id, {$set:{profilePic: `/uploads/${req.file.filename}`}}, {new:true});
        res.status(201).json({
          message: 'File uploaded successfully',
          filePath: `/uploads/${req.file.filename}`,
          result // Path to the uploaded file,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }

});

router.get("/search" , async(req,res)=>{
    const {username} = req.query;
    if(!username){
       return res.status(404).send("Please provide username to search a user");
    }
    try{
        const users = await user.find({username: {$regex: username, $options: 'i'}}).select("-password");
        return res.status(200).send(users);
    }
    catch(err){
       return res.status(500).send("What happened");
    }
});


module.exports = router;