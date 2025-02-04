// server/__tests__/employee.test.js
import request from 'supertest';
import app from '../server.js';
import Employee from '../models/Employee.js';
import { connectDB, closeDB, clearDB } from './testDb.js';
import jwt from 'jsonwebtoken';

let adminToken;

beforeAll(async () => {
  await connectDB();
  const admin = await Employee.create({
    name: 'Test Admin',
    email: 'admin@test.com',
    password: 'password123',
    pin: '1234',
    role: 'admin',
    department: 'IT'
  });
  adminToken = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET);
});

afterEach(async () => await clearDB());
afterAll(async () => await closeDB());

describe('Employee API', () => {
  describe('POST /api/employees', () => {
    it('should create a new employee when admin authenticated', async () => {
      const res = await request(app)
        .post('/api/employees')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'New Employee',
          email: 'new@example.com',
          password: 'test123',
          pin: '5678',
          department: 'HR'
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('name', 'New Employee');
    });
  });
});

// server/__tests__/attendance.test.js
import request from 'supertest';
import app from '../server.js';
import { connectDB, closeDB, clearDB } from './testDb.js';

describe('Attendance API', () => {
  beforeAll(async () => await connectDB());
  afterEach(async () => await clearDB());
  afterAll(async () => await closeDB());

  describe('POST /api/attendance/check-in', () => {
    it('should allow employee to check in with valid PIN', async () => {
      // Create test employee first
      const employee = await Employee.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        pin: '1234',
        department: 'IT'
      });

      const res = await request(app)
        .post('/api/attendance/check-in')
        .send({ pin: '1234' });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('timeIn');
    });
  });
});

// server/__tests__/auth.test.js
import request from 'supertest';
import app from '../server.js';
import Employee from '../models/Employee.js';
import { connectDB, closeDB, clearDB } from './testDb.js';

describe('Auth API', () => {
  beforeAll(async () => await connectDB());
  afterEach(async () => await clearDB());
  afterAll(async () => await closeDB());

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      // Create test user
      const password = 'password123';
      const employee = await Employee.create({
        name: 'Test User',
        email: 'test@example.com',
        password,
        pin: '1234',
        department: 'IT'
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
  });
});
