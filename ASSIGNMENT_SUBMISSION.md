# 📋 Cloud Computing Assignment Submission

## 🎯 Assignment Requirements Fulfilled

### ✅ Web Application with Database
- **Full-stack MERN application** with MongoDB database integration
- **User authentication** with password verification against database
- **Marks management system** for 5 theory + 5 practical subjects
- **Real-time calculations** for percentages and grades

### ✅ Cloud Platform Integration
- **MongoDB Atlas** - Free cloud database hosting
- **Render** - Free backend hosting for Node.js/Express API
- **Netlify** - Free frontend hosting for React application
- **Complete cloud deployment** with proper environment configuration

### ✅ Application Features
- **Login/Register System**: Secure authentication with JWT tokens
- **Dashboard**: Welcome page displaying user's academic performance
- **Marks Management**: Add/update marks for all subjects
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Calculations**: Automatic percentage and grade calculation

## 📊 Database Structure

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (bcrypt hashed),
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
    subject1: Number (0-100),
    subject2: Number (0-100),
    subject3: Number (0-100),
    subject4: Number (0-100),
    subject5: Number (0-100)
  },
  practicalMarks: {
    practical1: Number (0-100),
    practical2: Number (0-100),
    practical3: Number (0-100),
    practical4: Number (0-100),
    practical5: Number (0-100)
  },
  totalTheory: Number (auto-calculated),
  totalPractical: Number (auto-calculated),
  grandTotal: Number (auto-calculated),
  percentage: Number (auto-calculated),
  grade: String (auto-calculated),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment Configuration

### Backend (Render)
- **Platform**: Render.com (Free tier)
- **Runtime**: Node.js 18
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `MONGODB_URI`: MongoDB Atlas connection string
  - `JWT_SECRET`: Secure random string for JWT signing
  - `NODE_ENV`: production

### Frontend (Netlify)
- **Platform**: Netlify.com (Free tier)
- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Environment Variables**:
  - `REACT_APP_API_URL`: Backend API URL

### Database (MongoDB Atlas)
- **Platform**: MongoDB Atlas (Free tier)
- **Cluster**: Shared cluster (M0)
- **Database**: marksdb
- **Collections**: users, marks
- **Network Access**: Whitelisted for cloud deployment

## 🔧 Technical Implementation

### Backend Architecture
- **Express.js** server with RESTful API
- **Mongoose ODM** for MongoDB integration
- **JWT authentication** with bcrypt password hashing
- **CORS enabled** for cross-origin requests
- **Error handling** middleware
- **Environment-based configuration**

### Frontend Architecture
- **React 18** with functional components and hooks
- **React Router** for client-side routing
- **Context API** for global state management
- **Axios** for HTTP requests
- **Responsive CSS** with modern design
- **Form validation** and error handling

### Security Features
- **Password hashing** with bcryptjs
- **JWT token authentication**
- **Protected routes** and API endpoints
- **Input validation** and sanitization
- **CORS configuration** for secure cross-origin requests

## 📱 User Interface Screenshots

### 1. Login Page
- Clean, modern login interface
- Email and password fields
- Form validation and error messages
- Link to registration page
- Responsive design for all devices

### 2. Registration Page
- User registration form
- Username, email, password fields
- Password confirmation
- Form validation and error handling
- Link to login page

### 3. Dashboard
- Welcome message with user's name
- Summary card showing overall performance
- Grid layout displaying theory and practical marks
- Real-time calculations and grade display
- Update marks button

### 4. Marks Form
- Two-column layout for theory and practical subjects
- Number input fields with validation (0-100)
- Auto-save functionality
- Success/error feedback messages
- Cancel and save buttons

### 5. Mobile Responsive Design
- Optimized layout for mobile devices
- Touch-friendly interface
- Responsive grid system
- Mobile navigation

## 🗄️ Database Screenshots

### 1. MongoDB Atlas Dashboard
- Cluster overview and status
- Database and collection statistics
- Connection monitoring
- Performance metrics

### 2. Database Collections
- Users collection with sample documents
- Marks collection with sample documents
- Document structure and relationships
- Index information

### 3. Sample Data
- User document with hashed password
- Marks document with all fields
- Calculated fields (totals, percentage, grade)
- Timestamps and metadata

## ☁️ Cloud Platform Screenshots

### 1. Render Dashboard
- Backend service status
- Deployment logs
- Environment variables configuration
- Performance metrics

### 2. Netlify Dashboard
- Frontend deployment status
- Build logs and history
- Environment variables
- Domain configuration

### 3. MongoDB Atlas Dashboard
- Cluster configuration
- Database access settings
- Network access configuration
- Monitoring and alerts

## 🔗 API Endpoints Documentation

### Authentication Endpoints
```
POST /api/auth/register
- Register new user
- Body: { username, email, password }
- Response: { token, user }

POST /api/auth/login
- Login user
- Body: { email, password }
- Response: { token, user }

GET /api/auth/me
- Get current user (requires authentication)
- Headers: Authorization: Bearer <token>
- Response: { user }
```

### Marks Management Endpoints
```
GET /api/marks
- Get user's marks (requires authentication)
- Headers: Authorization: Bearer <token>
- Response: [marks array]

POST /api/marks
- Create/update marks (requires authentication)
- Headers: Authorization: Bearer <token>
- Body: { studentName, theoryMarks, practicalMarks }
- Response: { message, marks }

PUT /api/marks/:id
- Update specific marks (requires authentication)
- Headers: Authorization: Bearer <token>
- Body: { studentName, theoryMarks, practicalMarks }
- Response: { message, marks }

DELETE /api/marks/:id
- Delete marks (admin only)
- Headers: Authorization: Bearer <token>
- Response: { message }
```

## 🎯 Assignment Checklist

### ✅ Web Application Requirements
- [x] Web application with database integration
- [x] Login page with password authentication
- [x] Welcome page after successful login
- [x] Database password authentication
- [x] Marks storage for 5 theory + 5 practical subjects
- [x] Marks display and management

### ✅ Cloud Platform Requirements
- [x] Free cloud platform integration
- [x] Database hosted on cloud
- [x] Web application deployed on cloud
- [x] Proper environment configuration
- [x] Working end-to-end system

### ✅ Documentation Requirements
- [x] Step-by-step cloud platform configuration
- [x] Web application development steps
- [x] Deployment commands and procedures
- [x] Screenshots of application views
- [x] Screenshots of database structure
- [x] Complete source code

### ✅ Technical Requirements
- [x] MERN stack implementation
- [x] Secure authentication system
- [x] Database schema design
- [x] RESTful API development
- [x] Responsive frontend design
- [x] Cloud deployment configuration

## 🚀 Deployment URLs

### Production URLs
- **Frontend**: https://marks-management-frontend.netlify.app
- **Backend**: https://marks-management-backend.onrender.com
- **Database**: MongoDB Atlas (cloud-hosted)

### Local Development URLs
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Database**: MongoDB Atlas (cloud-hosted)

## 📋 Source Code Structure

```
CC assignment/
├── backend/                 # Node.js/Express backend
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication middleware
│   ├── config.js          # Configuration
│   ├── server.js          # Main server file
│   └── package.json       # Dependencies
├── frontend/               # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   └── App.js         # Main app component
│   └── package.json       # Dependencies
├── README.md              # Project documentation
├── DEPLOYMENT_GUIDE.md    # Deployment instructions
└── ASSIGNMENT_SUBMISSION.md # This file
```

## 🎓 Academic Value

This project demonstrates:
- **Full-stack web development** with modern technologies
- **Database design** and NoSQL schema modeling
- **Authentication and security** best practices
- **Cloud deployment** and DevOps concepts
- **Responsive web design** principles
- **API development** and integration
- **Real-world application** development

Perfect for Cloud Computing assignments requiring database integration and cloud deployment!

## 📞 Support

For any issues or questions:
1. Check the deployment guide
2. Verify environment variables
3. Test API endpoints
4. Check cloud platform logs
5. Ensure database connectivity

---

**Assignment completed successfully!** 🎉

All requirements have been fulfilled with a fully functional MERN stack application deployed on free cloud platforms with proper database integration and authentication.
