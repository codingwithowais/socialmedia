const router = new require("express").Router();
// const { strictTransportSecurity } = require("helmet");
const Post = require('../models/Post');
const User = require('../models/User');
const fetchUser = require('../middlewares/fetchuser');
const upload = require('../middlewares/mediaUploads');

// Add a post
router.post("/addPost", fetchUser  ,   async(req,res)=>{
    console.log(req.body.picture);
    const user = await User.findById(req.user.id);
    const post = {
        userId: req.user.id,
        username: user.username,
        profilePic: user.profilePic,
        description: req.body.description,
        picture: req.body.picture
    }
    const newPost = new Post(post);
    try{
        const savedPost = await newPost.save();
        res.status(201).send(savedPost);

    }catch(err){
        res.status(500).send(err);
    }   
});

// updating post
router.put("/updatePost/:id" , async(req,res)=>{
    try{
        if(req.body.userId == postToUpdate.userId){
            const postToUpdate = await Post.findById(req.params.id);
            const result = await postToUpdate.updateOne(req.body);
            res.status(200).send("Post Updated Successfully");
        }else{
            res.status(404).send("You can only update your post");
        }
        }catch(err){
            res.status(500).send(err);
        }
});

// Deleting post
router.delete("/deletePost/:id" , async(req,res)=>{
    try{
        const postToDelete = await Post.findById(req.params.id);
        if(req.body.userId == postToDelete.userId){
                const result = await postToDelete.deleteOne();
                res.status(200).send("Post Deleted Successfully");
        }else{
            res.status(404).send("You can only delete your post");
        }
    }catch(err){
        res.status(500).send(err);
    }
});

// Adding likes and dislikes functionality
router.put("/likes/:id" , fetchUser,  async(req,res)=>{
    console.log(req.user.id);
    try{
        const currPost = await Post.findById(req.params.id);
        // If the post is already liked dislike the post
        if(currPost.likes.includes(req.user.id)){
           const result =  await Post.findByIdAndUpdate(req.params.id , {$pull:{likes: req.user.id}} , {new:true});
            res.status(201).send({message:"Post Disliked" , result});
        }
        // Like the post when not liked
        else{
            const result = await Post.findByIdAndUpdate(req.params.id , {$push:{likes: req.user.id}},{new:true});
            res.status(201).send({message: "Post Liked" , result}); 
        }

    }catch(err){
        res.status(500).send(err);
    }
});

// Displaying timeline posts
router.get("/timelinePost" , fetchUser , async(req, res)=>{
    console.log(req.user.id);
    try{
        const currUser = await User.findById(req.user.id);
        const userPosts = await Post.find({userId: req.user.id});
        const followersPosts = await Promise.all(currUser.following.map((freindsPost)=>{
            return Post.find({userId: freindsPost});
        }));
        let timelinePosts = userPosts;
        followersPosts.forEach((elem)=>{
            timelinePosts = timelinePosts.concat(elem);
        });
        res.status(200).send(timelinePosts);
    }catch(err){
        res.status(500).send(err);
    }
});


router.post('/uploadPostImage', upload.single('media'), async(req,res)=>{
    try {
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log('Uploaded File:', req.file);
        console.log('Request Body:', req.body);
    
        // File uploaded successfully
        // console.log(req.headers.authorization);
        res.status(201).json({
          message: 'File uploaded successfully',
          filePath: `/uploads/${req.file.filename}`
         // Path to the uploaded file,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }

})

module.exports = router;