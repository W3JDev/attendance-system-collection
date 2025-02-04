// server/routes/auth.js
import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authController.login);

export default router;

// server/routes/employees.js
import express from 'express';
import * as employeeController from '../controllers/employeeController.js';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/', auth, adminAuth, employeeController.createEmployee);
router.get('/', auth, adminAuth, employeeController.getEmployees);
router.put('/:id', auth, adminAuth, employeeController.updateEmployee);

export default router;

// server/routes/attendance.js
import express from 'express';
import * as attendanceController from '../controllers/attendanceController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/check-in', attendanceController.checkIn);
router.post('/check-out', attendanceController.checkOut);
router.get('/my-records', auth, attendanceController.getAttendance);
router.post('/request', auth, attendanceController.submitRequest);

export default router;
