import { Request, Response } from 'express';
import Product from '../models/location_model';
import { IStandart } from '../interfaces/i_standart';
import { handleError, handleStatus, sendError } from '../utils/helper';

export const addLocation = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json({
            status: 200,
            message: 'Successfully add location',
            data: product,
        } as IStandart);
    } catch (error) {
        sendError(res, handleStatus(error), handleError(error));
    }
};

export const getLocations = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status: 200,
            message: 'Successfully fetch locations',
            data: products,
        } as IStandart);
    } catch (error) {
        sendError(res, handleStatus(error), handleError(error));
    }
};

export const deleteLocationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return sendError(res, 404, 'Location not found');
        }

        res.status(200).json({
            status: 200,
            message: 'Successfully delete location',
            data: product,
        } as IStandart);
    } catch (error) {
        sendError(res, handleStatus(error), handleError(error));
    }
};
