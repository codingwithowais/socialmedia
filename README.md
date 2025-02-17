# Social Media App

## 🚀 Overview

This is a full-stack social media application where users can create an account, post updates, like/dislike posts, follow/unfollow other users, and update their profiles. The app provides authentication, real-time feed updates, and a seamless user experience.

## ✨ Features

- **User Authentication & Authorization**: Secure login/signup using JWT authentication.
- **Post Management**: Create, like/dislike posts, and view feeds.
- **User Profiles**: Upload/display profile and cover pictures, edit user details (city, relationship status, etc.).
- **Follow System**: Follow/unfollow users and see posts from friends.
- **Search Feature**: Find other users by name.
- **Timeline Feed**: View posts from friends in chronological order.
- **Security Enhancements**: Data validation, password hashing, and HTTP security headers.

## 🛠 Tech Stack

### Frontend:

- React.js
- Material-UI
- React Router
- Axios
- React Toastify

### Backend:

- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- JWT Authentication
- Multer (for file uploads)
- CORS, Helmet, Morgan for security and logging

## 🏗 Installation & Setup

### Prerequisites

- Node.js and npm/yarn installed
- MongoDB instance running locally or in the cloud

### Steps to Run Locally

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/socialmedia.git
cd socialmedia
```

#### 2️⃣ Setup Backend

```bash
cd backend
npm install  # or yarn install
```

- Create a `.env` file in the backend directory with the following:
  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  ```
- Start the backend server:

```bash
npm start  # or yarn start
```

#### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install  # or yarn install
npm start  # or yarn start
```

The app should now be running on `http://localhost:3000/`.

## 📂 Project Structure

```
/social-media-app
├── backend
│   ├── models/        # Database schemas
│   ├── routes/        # API routes
│   ├── controllers/   # Business logic
│   ├── middleware/    # JWT & security middleware
│   ├── uploads/       # Profile & cover images
│   ├── .env           # Environment variables
│   └── server.js      # Express server setup
│
├── frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Pages (Feed, Profile, Login, etc.)
│   │   ├── context/     # Context API for state management
│   │   ├── assets/      # Images and static files
│   │   ├── App.js       # Main entry file
│   │   ├── index.js     # React entry point
│   ├── .env            # Frontend environment variables
│   └── package.json    # Dependencies and scripts
```

## 🌍 Deployment

- **Frontend**: Can be deployed on Vercel, Netlify, or Firebase Hosting.
- **Backend**: Can be deployed on Render, Railway, or AWS EC2.
- **Database**: Hosted on MongoDB Atlas.

## 🤝 Contribution

Feel free to open an issue or submit a PR to improve the project!

## 📜 License

MIT License © 2025 Your Name

---

### 🔥 Happy Coding! 🚀

