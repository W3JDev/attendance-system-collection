// server/seeds/seed.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Employee from '../models/Employee.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = {
  employees: [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      pin: '1234',
      role: 'admin',
      department: 'Administration',
      status: 'active'
    },
    {
      name: 'Test Employee',
      email: 'employee@example.com',
      password: 'employee123',
      pin: '5678',
      role: 'employee',
      department: 'IT',
      status: 'active'
    }
  ]
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Employee.deleteMany({});

    // Hash passwords and create employees
    const employees = await Promise.all(
      seedData.employees.map(async (emp) => {
        const hashedPassword = await bcrypt.hash(emp.password, 10);
        return {
          ...emp,
          password: hashedPassword
        };
      })
    );

    await Employee.insertMany(employees);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

// Add to package.json scripts
{
  "scripts": {
    "seed": "node seeds/seed.js"
  }
}
