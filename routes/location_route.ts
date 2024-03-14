import express from 'express';
import {
    getLocations,
    addLocation,
    deleteLocationById,
} from '../controllers/location_controller';

const router = express.Router();

// add location
router.post('/', addLocation);

// get all location
router.get('/', getLocations);

// delete location by id
router.delete('/:id', deleteLocationById);

export default router;
