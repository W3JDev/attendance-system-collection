// server/__tests__/auth.test.js
import request from 'supertest';
import app from '../server.js';
import Employee from '../models/Employee.js';
import { connectDB, closeDB, clearDB } from './testDb.js';

beforeAll(async () => await connectDB());
afterEach(async () => await clearDB());
afterAll(async () => await closeDB());

describe('Auth Endpoints', () => {
  it('should login with valid credentials', async () => {
    const employee = await Employee.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
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

// server/__tests__/testDb.js
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod;

export const connectDB = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
};

export const closeDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

export const clearDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
};
