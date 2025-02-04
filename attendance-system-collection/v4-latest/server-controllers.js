// server/controllers/authController.js
import jwt from 'jsonwebtoken';
import Employee from '../models/Employee.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    
    if (!employee || !(await employee.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: employee._id, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      role: employee.role,
      name: employee.name
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// server/controllers/employeeController.js
import Employee from '../models/Employee.js';

export const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}).select('-password');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password');
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// server/controllers/attendanceController.js
import Attendance from '../models/Attendance.js';
import AttendanceRequest from '../models/AttendanceRequest.js';

export const checkIn = async (req, res) => {
  try {
    const { pin } = req.body;
    const employee = await Employee.findOne({ pin });
    
    if (!employee) {
      return res.status(401).json({ error: 'Invalid PIN' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAttendance = await Attendance.findOne({
      employeeId: employee._id,
      date: today
    });

    if (existingAttendance) {
      return res.status(400).json({ error: 'Already checked in today' });
    }

    const attendance = new Attendance({
      employeeId: employee._id,
      date: today,
      timeIn: new Date()
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkOut = async (req, res) => {
  try {
    const { pin } = req.body;
    const employee = await Employee.findOne({ pin });
    
    if (!employee) {
      return res.status(401).json({ error: 'Invalid PIN' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      employeeId: employee._id,
      date: today,
      timeOut: { $exists: false }
    });

    if (!attendance) {
      return res.status(400).json({ error: 'No active check-in found' });
    }

    attendance.timeOut = new Date();
    await attendance.save();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      employeeId: req.user.id
    }).populate('employeeId', 'name');
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
