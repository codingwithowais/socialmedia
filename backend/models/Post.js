const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
    },
    profilePic:{
        type:String
    },
    description:{
        type:String,
        default: ""
    },
    picture:{
        type:String,
    },
    likes:{
        type:Array,
        default: []
    }
},{timestamps: true});
const post = new mongoose.model('post', schema);
module.exports = post;