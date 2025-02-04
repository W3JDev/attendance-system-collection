# Smart-Attendance-V3
# Employee Attendance System

A full-stack web application for managing employee attendance with PIN and card-based check-in systems.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/employee-attendance
cd employee-attendance

# Install dependencies
cd frontend
npm install
cd ../backend
npm install

# Start development servers
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Project Structure

```
employee-attendance/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AttendanceSystem.jsx    # Check-in interface
│   │   │   ├── AdminDashboard.jsx      # Admin panel
│   │   │   └── AddEmployee.jsx         # Add employee form
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── Attendance.jsx
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── employeeController.js
│   │   └── attendanceController.js
│   ├── models/
│   │   ├── Employee.js
│   │   └── Attendance.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── employees.js
│   │   └── attendance.js
│   ├── index.js
│   └── package.json
└── README.md
```

## Setup Instructions

### 1. Frontend Setup
```bash
npx create-react-app frontend
cd frontend
npm install @/components/ui axios react-router-dom
```

### 2. Backend Setup
```bash
mkdir backend
cd backend
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
```

### 3. Database Setup
1. Create MongoDB Atlas account
2. Create new cluster
3. Add connection string to `.env`

### 4. Environment Variables

Create `.env` in backend folder:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Create `.env` in frontend folder:
```
REACT_APP_API_URL=http://localhost:5000
```

## Features Currently Implemented

1. Basic Authentication
   - Login/Logout
   - JWT token management

2. Attendance System
   - PIN-based check-in/out
   - Card scanning interface

3. Admin Dashboard
   - Overview statistics
   - Employee list view
   - Attendance records

## Features To Be Implemented

1. Employee Management ⏳
   - Add new employee form
   - Edit employee details
   - Deactivate/reactivate employees
   - Bulk employee import/export

2. Attendance Features ⏳
   - Overtime tracking
   - Break time management
   - Location tracking
   - Multiple shift support
   - Late arrival notifications

3. Reporting System ⏳
   - Daily attendance reports
   - Monthly timesheets
   - Department-wise reports
   - Custom date range reports
   - Export to PDF/Excel

4. Leave Management ⏳
   - Leave request submission
   - Approval workflow
   - Leave balance tracking
   - Holiday calendar

5. Mobile App Integration ⏳
   - Mobile check-in
   - Geolocation verification
   - Push notifications

6. Advanced Security ⏳
   - Two-factor authentication
   - IP restriction
   - Activity logging
   - Session management

## API Endpoints

### Authentication
```
POST /api/auth/login
POST /api/auth/register (admin only)
```

### Employees
```
GET    /api/employees         - List all employees
POST   /api/employees         - Add new employee
GET    /api/employees/:id     - Get employee details
PUT    /api/employees/:id     - Update employee
DELETE /api/employees/:id     - Delete employee
```

### Attendance
```
POST   /api/attendance/check-in   - Clock in
POST   /api/attendance/check-out  - Clock out
GET    /api/attendance/daily      - Daily report
GET    /api/attendance/monthly    - Monthly report
```

## Deployment

### Deploying to Railway

1. Create Railway account
2. Install Railway CLI:
```bash
npm i -g @railway/cli
```

3. Login and deploy:
```bash
railway login
railway init
railway up
```

### Deploying to Vercel

1. Create Vercel account
2. Install Vercel CLI:
```bash
npm i -g vercel
```

3. Deploy:
```bash
cd frontend
vercel
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## Security Considerations

1. Data Protection
   - Encrypt sensitive data
   - Secure password storage
   - Regular backups

2. Access Control
   - Role-based permissions
   - Session management
   - API rate limiting

3. Compliance
   - GDPR compliance
   - Data retention policies
   - Audit logging

## Support

For support, email your-email@domain.com or join our Discord channel.

## License

MIT License
