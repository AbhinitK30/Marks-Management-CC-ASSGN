# 📊 Marks Management System

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application for managing student academic marks with cloud deployment.

## 🚀 Features

- **User Authentication**: Secure login/register with JWT tokens
- **Marks Management**: Track 5 theory + 5 practical subjects
- **Real-time Calculations**: Automatic percentage and grade calculation
- **Responsive Design**: Modern UI that works on all devices
- **Cloud Deployment**: Deployed on Render (Backend) + Netlify (Frontend) + MongoDB Atlas (Database)

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **React 18** with functional components
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management

### Cloud Platform
- **Render** - Backend hosting
- **Netlify** - Frontend hosting
- **MongoDB Atlas** - Database hosting

## 📁 Project Structure

```
CC assignment/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema
│   │   └── Marks.js         # Marks schema
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── marks.js         # Marks CRUD routes
│   ├── middleware/
│   │   └── auth.js          # JWT middleware
│   ├── config.js            # Configuration
│   ├── server.js            # Main server file
│   └── package.json         # Backend dependencies
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   └── MarksForm.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json         # Frontend dependencies
└── README.md               # This file
```

## 🚀 Deployment Guide

### Step 1: MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new cluster (choose free tier)

2. **Configure Database**
   - Create a database user with read/write permissions
   - Whitelist your IP address (0.0.0.0/0 for all IPs)
   - Get your connection string

3. **Connection String Format**
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/marksdb?retryWrites=true&w=majority
   ```

### Step 2: Backend Deployment on Render

1. **Prepare Backend for Deployment**
   - Update `config.js` to use environment variables
   - Create `render.yaml` for deployment configuration

2. **Deploy to Render**
   - Connect your GitHub repository to Render
   - Set environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string
     - `NODE_ENV`: production

3. **Backend URL**
   - Render will provide a URL like: `https://your-app-name.onrender.com`

### Step 3: Frontend Deployment on Netlify

1. **Build Frontend**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Add environment variable:
     - `REACT_APP_API_URL`: Your Render backend URL

3. **Frontend URL**
   - Netlify will provide a URL like: `https://your-app-name.netlify.app`

## 🔧 Local Development

### Backend Setup
```bash
cd backend
npm install
# Create .env file with your MongoDB URI
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
# Create .env file with REACT_APP_API_URL=http://localhost:5000/api
npm start
```

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  role: String (student/admin),
  createdAt: Date,
  updatedAt: Date
}
```

### Marks Collection
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: User),
  studentName: String,
  theoryMarks: {
    subject1: Number,
    subject2: Number,
    subject3: Number,
    subject4: Number,
    subject5: Number
  },
  practicalMarks: {
    practical1: Number,
    practical2: Number,
    practical3: Number,
    practical4: Number,
    practical5: Number
  },
  totalTheory: Number,
  totalPractical: Number,
  grandTotal: Number,
  percentage: Number,
  grade: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Marks Management
- `GET /api/marks` - Get all marks (user's own or all if admin)
- `GET /api/marks/:id` - Get specific marks
- `POST /api/marks` - Create/update marks
- `PUT /api/marks/:id` - Update marks
- `DELETE /api/marks/:id` - Delete marks (admin only)

## 🎯 Features Implemented

✅ **User Authentication**
- Secure password hashing with bcryptjs
- JWT token-based authentication
- Protected routes and API endpoints

✅ **Marks Management**
- CRUD operations for marks
- Automatic calculation of totals and percentages
- Grade assignment based on percentage

✅ **Responsive UI**
- Modern, mobile-friendly design
- Real-time form validation
- Loading states and error handling

✅ **Cloud Deployment**
- Backend deployed on Render
- Frontend deployed on Netlify
- Database hosted on MongoDB Atlas

## 📱 Screenshots

### Login Page
- Clean, modern login interface
- Form validation and error handling
- Link to registration page

### Dashboard
- Welcome message with user's name
- Summary card showing overall performance
- Grid layout for theory and practical marks
- Update marks button

### Marks Form
- Two-column layout for theory and practical subjects
- Number input validation (0-100)
- Auto-save functionality
- Success/error feedback

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/marksdb
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=production
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

## 🚀 Deployment Commands

### Backend (Render)
```bash
# No specific commands needed - Render handles deployment automatically
# Just push to GitHub and connect to Render
```

### Frontend (Netlify)
```bash
npm run build
# Netlify will automatically build and deploy
```

## 📋 Assignment Requirements Checklist

✅ **Web Application with Database**
- Full-stack MERN application
- MongoDB database integration
- User authentication with password verification

✅ **Login Page & Welcome Page**
- Secure login system
- Dashboard after successful login
- User-specific data display

✅ **Marks Storage & Display**
- 5 theory subjects + 5 practical subjects
- Database storage and retrieval
- Real-time calculations and display

✅ **Cloud Platform Integration**
- MongoDB Atlas for database
- Render for backend hosting
- Netlify for frontend hosting

✅ **Documentation**
- Complete deployment guide
- Database schema documentation
- API endpoint documentation
- Screenshots and code examples

## 🎓 Academic Use

This project demonstrates:
- **Full-stack development** with modern technologies
- **Database design** and schema modeling
- **Authentication and security** best practices
- **Cloud deployment** and DevOps concepts
- **Responsive web design** principles
- **API development** and integration

Perfect for Cloud Computing assignments requiring database integration and cloud deployment!
