// server/.env.example
PORT=5000
MONGODB_URI=mongodb://localhost:27017/attendance
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

// server/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Attendance System API',
      version: '1.0.0',
      description: 'API documentation for the Attendance System',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

export const specs = swaggerJsdoc(options);

// Add to server.js
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger.js';

// Add after other middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
