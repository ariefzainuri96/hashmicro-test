import mongoose from 'mongoose';
import { IStandart } from '../interfaces/i_standart';
import { Response } from 'express';

export function handleError(error: any | unknown): string {
    if (error instanceof Error) return error.message;

    return `${error}`;
}

export function handleStatus(error: any | unknown): number {
    return error instanceof mongoose.Error.ValidationError ? 400 : 500;
}

export function sendError(res: Response, status: number, err: string) {
    res.status(status).json({
        status: status,
        message: handleError(err),
    } as IStandart);
}
