import express from 'express';
import {
    getAttendanceHistory,
    addAttendance,
} from '../controllers/attendance_controller';

const router = express.Router();

// add attendance
router.post('/', addAttendance);

// get attendance history
router.get('/', getAttendanceHistory);

export default router;
