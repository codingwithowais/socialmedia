const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    username:{
        type:String,
        min: 2,
        max: 15,
        required:true,
        unique: true
    },
    email:{
        type: String,
        max: 40,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        min: 8,
        max: 32    
    },
    bio:{
        type:String,
        default: ""
    },
    profilePic:{
        type:String,
        default: ""
    },
    coverPic:{
        type:String,
        default: ""
    },
    city:{
        type:String,
        default: ""
    },
    hometown:{
        type:String,
        default: ""
    },
    relationStatus:{
        type:String,
        default: "Prefer not to say",
        enum: ["Prefer not to say" , "Single" , "In a relationship" , "Marrried"]
    },
    qualification:{
        type:String,
        default:""
    },
    followers:{
        type: Array,
        default: []
    },
    following:{
        type: Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
},{timestamps: true});

const user = new mongoose.model('user' , schema);
module.exports = user;