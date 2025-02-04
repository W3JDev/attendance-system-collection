// package.json (root)
{
  "name": "attendance-system",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "client",
    "server"
  ],
  "scripts": {
    "start": "concurrently \"npm run start:client\" \"npm run start:server\"",
    "start:client": "npm start --workspace=client",
    "start:server": "npm start --workspace=server",
    "test": "npm run test:client && npm run test:server",
    "test:client": "npm test --workspace=client",
    "test:server": "npm test --workspace=server",
    "build": "npm run build --workspace=client"
  },
  "devDependencies": {
    "concurrently": "^7.6.0"
  }
}

// client/package.json
{
  "name": "client",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0",
    "@/components/ui": "^0.1.0",
    "lucide-react": "^0.263.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}

// server/package.json
{
  "name": "server",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "supertest": "^6.3.0",
    "nodemon": "^2.0.20"
  }
}
