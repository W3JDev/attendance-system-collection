# Employee Attendance System - Complete Setup Guide

## Prerequisites Installation for Windows

1. Install required software:
   - Download and install [Node.js](https://nodejs.org/) (LTS version)
   - Download and install [VS Code](https://code.visualstudio.com/)
   - Download and install [Git](https://git-scm.com/downloads)

2. VS Code Extensions to install:
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter
   - GitLens
   - Tailwind CSS IntelliSense

## Repository Structure

```
attendance-system/
├── .gitignore
├── package.json
├── README.md
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── attendance/
│   │   │   │   ├── CheckInSystem.jsx
│   │   │   │   └── RequestForm.jsx
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── EmployeeManagement.jsx
│   │   │   │   └── Reports.jsx
│   │   │   └── shared/
│   │   │       ├── Navbar.jsx
│   │   │       └── Loading.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── StaffDashboard.jsx
│   │   │   └── AttendanceTerminal.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
└── server/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── employeeController.js
    │   └── attendanceController.js
    ├── middleware/
    │   ├── auth.js
    │   └── error.js
    ├── models/
    │   ├── Employee.js
    │   └── Attendance.js
    ├── routes/
    │   ├── auth.js
    │   ├── employees.js
    │   └── attendance.js
    ├── .env
    ├── package.json
    └── server.js
```

## Step-by-Step Setup Instructions

1. Open VS Code and clone the repository:
```bash
# Open Command Palette (Ctrl + Shift + P)
# Type: Git Clone
# Enter repository URL when prompted
```

2. Open Terminal in VS Code (Ctrl + `)

3. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

4. Set up environment variables:

Create `server/.env`:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

Create `client/.env`:
```env
REACT_APP_API_URL=http://localhost:5000
```

5. Start development servers:
```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm start
```

6. Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Admin login: admin@example.com / admin123
- Test employee: staff@example.com / staff123

## GitHub Deployment Steps

1. Create new repository on GitHub

2. Initialize and push code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your_repository_url
git push -u origin main
```

## Default Login Credentials

### Admin Account:
- Email: admin@example.com
- Password: admin123

### Test Employee Account:
- Email: staff@example.com
- Password: staff123
- PIN: 1234

