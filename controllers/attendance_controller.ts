import { Request, Response } from 'express';
import { IStandart } from '../interfaces/i_standart';
import { handleError, handleStatus, sendError } from '../utils/helper';
import Attendance from '../models/attendance_models';

export const addAttendance = async (req: Request, res: Response) => {
    try {
        const attendance = await Attendance.create(req.body);
        res.status(200).json({
            status: 200,
            message: 'Successfully create Attendance',
            data: attendance,
        } as IStandart);
    } catch (error) {
        sendError(res, handleStatus(error), handleError(error));
    }
};

export const getAttendanceHistory = async (req: Request, res: Response) => {
    try {
        const attendance = await Attendance.find();
        res.status(200).json({
            status: 200,
            message: 'Successfully fetch attendance',
            data: attendance,
        } as IStandart);
    } catch (error) {
        sendError(res, handleStatus(error), handleError(error));
    }
};
