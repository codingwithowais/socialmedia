const router = new require("express").Router();
const user = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middlewares/fetchuser");

// Adding a new user
router.get('/', (req,res)=>{
    res.send("Welcome to the server");
})
router.post("/register" , async(req,res)=>{
    try{
        // if(req.body.password != req.body.cnfPassword){
        //     return res.status(401).send("Confirm password does not match");
        // }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new user({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
        const result = await newUser.save();
        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET);
        res.status(201).send({result , token});
    }
    catch(err){
        res.status(500).send({message: "User could not be registered", error:err});
    }
});

// Login an exisitng user
router.post("/login" , async(req,res)=>{
    try{
        const users = await user.findOne({email: req.body.email});
        // if user enters the email which is not registered
        if(!users){
            return res.status(404).send("This email does not exist");
        }
        const result = await bcrypt.compare(req.body.password , users.password);
        // If the entered password does not matches the stored users password in db
        if(!result){
            return res.status(400).send("Incorrect Password");
        }  
        // When all the credentials are correct
        const token = jwt.sign({id: users._id} , process.env.JWT_SECRET);
        console.log(token);
        return res.status(201).json({message:"Logged In successfully",token});
    }catch(err){
        res.status(500).send(err);
    }
});


router.get('/fetchuser',fetchuser , async(req,res)=>{
    try{
        const users = await user.findById(req.user.id).select("-password");
        if(!users){
            return res.status(401).send("Can not find user");
        }
        res.status(200).send(users);
    }
    catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;
