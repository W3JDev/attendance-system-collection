// server/index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import employeeRoutes from './routes/employees.js';
import attendanceRoutes from './routes/attendance.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// server/models/Employee.js
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pin: { type: String, required: true },
  cardId: { type: String, unique: true },
  department: { type: String, required: true },
  role: { type: String, default: 'employee' },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Employee', employeeSchema);

// server/models/Attendance.js
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  date: { type: Date, required: true },
  timeIn: { type: Date },
  timeOut: { type: Date },
  status: { type: String, default: 'present' },
  notes: String,
  location: {
    type: { type: String },
    coordinates: [Number]
  }
});

export default mongoose.model('Attendance', attendanceSchema);

// server/controllers/attendanceController.js
import Attendance from '../models/Attendance.js';
import Employee from '../models/Employee.js';

export const clockIn = async (req, res) => {
  try {
    const { employeeId, pin } = req.body;
    const employee = await Employee.findById(employeeId);
    
    if (!employee || employee.pin !== pin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const attendance = new Attendance({
      employeeId,
      date: new Date(),
      timeIn: new Date()
    });

    await attendance.save();
    res.status(200).json({ message: 'Clock in successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clockOut = async (req, res) => {
  try {
    const { employeeId, pin } = req.body;
    const employee = await Employee.findById(employeeId);
    
    if (!employee || employee.pin !== pin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const attendance = await Attendance.findOne({
      employeeId,
      date: { 
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999)
      },
      timeOut: null
    });

    if (!attendance) {
      return res.status(404).json({ message: 'No active clock-in found' });
    }

    attendance.timeOut = new Date();
    await attendance.save();
    res.status(200).json({ message: 'Clock out successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
