const express = require("express");
const helmet = require("helmet");
const morgan  = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const upload = require('./middlewares/mediaUploads');
dotenv.config();
const port = 8800;

mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology:true}).then(()=>{
    console.log("Connection Established");
}).catch((err)=>{
    console.log(err);
});
const app = express();

// Middlewares
// To parse the json data
const uploadPath = path.join(__dirname, 'uploads');
app.use('/uploads' , express.static(uploadPath));
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST','PUT','DELETE'],
    credentials: true
  }));
// For the safety handling of requests
app.use(helmet());
// For noting the timestamp of making a request
app.use(morgan("common"));
app.use('/api/auth' , authRoute);
app.use('/api/user' , userRoute);
app.use('/api/post' , postRoute);





app.listen(port, ()=>{
    console.log(`Server running successfully on port ${port}`);
})