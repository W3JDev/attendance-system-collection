# Employee Attendance System

A complete attendance management system with employee tracking, reporting, and administrative features.

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- MongoDB
- Git
- VS Code

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/attendance-system.git
cd attendance-system
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Configure environment variables:
```bash
# Copy example env files
cp .env.example .env
cd client
cp .env.example .env
cd ..
```

4. Start development servers:
```bash
# Start both client and server
npm run dev
```

## 🏗️ Project Structure

```
attendance-system/
├── client/          # React frontend
├── server/          # Express backend
└── docs/           # Documentation
```

## 🔑 Features

### Admin Panel
- Dashboard with attendance overview
- Employee management
- Report generation
- Attendance monitoring

### Staff Features
- PIN/Card based check-in
- Attendance history
- Leave requests
- Profile management

## 🛠️ Development

### Available Scripts

```bash
# Run frontend
npm run client

# Run backend
npm run server

# Run tests
npm test

# Build for production
npm run build
```

### API Documentation

Base URL: `http://localhost:5000/api`

#### Authentication
```
POST /auth/login
POST /auth/register
```

#### Employees
```
GET    /employees
POST   /employees
PUT    /employees/:id
DELETE /employees/:id
```

#### Attendance
```
POST   /attendance/check-in
POST   /attendance/check-out
GET    /attendance/report
```

## 📦 Deployment

### Railway Deployment

1. Install Railway CLI:
```bash
npm i -g @railway/cli
```

2. Login and deploy:
```bash
railway login
railway init
railway up
```

### Manual Server Setup

1. Install dependencies:
```bash
npm install
```

2. Build frontend:
```bash
cd client
npm run build
```

3. Start server:
```bash
cd ../server
npm start
```

## 🔐 Security

- JWT authentication
- Password hashing
- Rate limiting
- Input validation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - see LICENSE.md

## 🆘 Support

For support, please email [your-email@example.com](mailto:your-email@example.com)
