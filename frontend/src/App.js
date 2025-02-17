import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useMavigate} from 'react-router-dom'
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import ImageUpload from './components/ImageUpload'
import { PostContextComponent } from "./contexts/post/PostContextComponent";
import UpdateProfile from './pages/update-profile/UpdateProfile'

function App() {
  return (
    <div>
      <PostContextComponent>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/updateProfile" element={<UpdateProfile/>}/>
      </Routes>
      </BrowserRouter>
      </PostContextComponent>
    </div>
  );
}

export default App;
