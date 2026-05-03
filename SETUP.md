# Setup Instructions for Resume AI

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Groq API Key (from https://console.groq.com)

## Installation Steps

### 1. Install Server Dependencies
```bash
cd server
npm install
```

### 2. Install Client Dependencies
```bash
cd client
npm install
```

### 3. Setup Environment Variables

#### Server (.env)
```bash
cd server
# Edit the .env file with your actual values:
# - MONGO_URI: Your MongoDB connection string
# - JWT_SECRET: Generate a strong random string
# - GROQ_API_KEY: Your Groq API key
```

### 4. Start the Application

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
# Server will run on http://localhost:5000
```

**Terminal 2 - Start Frontend Development Server:**
```bash
cd client
npm run dev
# Frontend will run on http://localhost:5173 (or next available port)
```

## Troubleshooting

### 404 Error on Login/Register
- Make sure the server is running on port 5000
- Check that .env file is properly configured
- Verify MongoDB is running and MONGO_URI is correct

### Connection Refused
- Check if port 5000 is already in use
- Kill the process using port 5000: `netstat -ano | findstr :5000` (Windows)

### MongoDB Connection Error
- For local MongoDB: Ensure MongoDB service is running
- For Atlas: Use proper connection string with credentials

## Project Structure
```
Resume_Ai/
├── server/           # Express.js backend
│   ├── Controllers/  # Route handlers
│   ├── models/       # MongoDB schemas
│   ├── Routes/       # API routes
│   ├── middleware/   # Express middleware
│   ├── config/       # Configuration files
│   ├── server.js     # Main server file
│   ├── package.json  # Server dependencies
│   └── .env         # Environment variables
├── client/           # React frontend
│   ├── src/
│   │   ├── pages/    # React pages
│   │   ├── components/ # React components
│   │   ├── features/ # Redux slices
│   │   └── App.jsx
│   └── vite.config.js # Vite config with proxy
└── package.json      # Root package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Resumes
- `GET /api/resumes` - Get all resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/:id` - Get specific resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### Analysis
- `POST /api/analysis/:resumeId` - Analyze resume with AI

## Notes
- The vite proxy in client/vite.config.js forwards `/api/*` requests to the backend
- JWT tokens are stored in localStorage
- Make sure both servers are running for the app to work properly
