# Attendance Management System

A comprehensive employee attendance tracking system built with React, Node.js, and MongoDB.

## Features

- 👥 Employee management
- 📊 Real-time attendance tracking
- 🔐 PIN/Card-based authentication
- 📱 Responsive design
- 📈 Analytics and reporting
- 🔒 Role-based access control

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Documentation**: Swagger
- **Testing**: Jest, React Testing Library
- **Deployment**: Docker, GitHub Actions

## Prerequisites

- Node.js 16+
- MongoDB
- Docker (optional)
- Git

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/attendance-system.git
cd attendance-system
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Configure environment variables:
```bash
# Server configuration
cp server/.env.example server/.env

# Client configuration
cp client/.env.example client/.env
```

4. Seed the database:
```bash
cd server
npm run seed
```

5. Start the application:
```bash
# Start server
npm run start

# Start client (in a new terminal)
cd ../client
npm start
```

## Docker Deployment

1. Build and run with Docker Compose:
```bash
docker-compose up --build
```

2. Access the application:
- Frontend: http://localhost
- Backend: http://localhost:5000
- API Docs: http://localhost:5000/api-docs

## Development

### Available Scripts

```bash
# Run tests
npm test

# Run development server
npm run dev

# Build for production
npm run build
```

### Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage
```

## API Documentation

API documentation is available at `/api-docs` when the server is running.

## Security

- JWT authentication
- Rate limiting
- Data sanitization
- Security headers
- XSS protection
- CORS configuration

## Deployment

### Production Setup

1. Build the client:
```bash
cd client
npm run build
```

2. Set environment variables in production:
```bash
JWT_SECRET=your_secret
MONGODB_URI=your_mongodb_uri
NODE_ENV=production
```

3. Start the server:
```bash
cd ../server
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please email support@example.com or raise an issue in the repository.
