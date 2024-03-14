import { Request, Response } from 'express';
import { IStandart } from '../interfaces/i_standart';
import { handleError, handleStatus, sendError } from '../utils/helper';
import Attendance from '../models/attendance_models';
import Location from '../models/location_model';
import { INearestLocation } from '../interfaces/i_nearest_location';

function distanceInMeter(
    lat: number,
    lng: number,
    latTarget: number,
    lngTarget: number
) {
    let dLat = ((lat - latTarget) * Math.PI) / 180;
    let dLon = ((lng - lngTarget) * Math.PI) / 180;
    var a =
        0.5 -
        Math.cos(dLat) / 2 +
        (Math.cos((latTarget * Math.PI) / 180) *
            Math.cos((lat * Math.PI) / 180) *
            (1 - Math.cos(dLon))) /
            2;
    let d = Math.round(6371000 * 2 * Math.asin(Math.sqrt(a)));

    return d;
}

export const addAttendance = async (req: Request, res: Response) => {
    try {
        const locations = await Location.find();
        const { latitude, longitude, name } = req.body;

        let nearestLocation: INearestLocation | undefined;

        const anyLocationThatMeetWithUserLocation = locations.filter(
            (element) => {
                const distance = distanceInMeter(
                    element.latitude,
                    element.longitude,
                    latitude,
                    longitude
                );

                console.log(`distance ${element.name} ==> ${distance}`);

                if (nearestLocation === undefined) {
                    nearestLocation = {
                        locationName: element.name,
                        distance: distance,
                    };
                } else {
                    if (distance < nearestLocation.distance) {
                        nearestLocation = {
                            locationName: element.name,
                            distance: distance,
                        };
                    }
                }

                return distance <= 50;
            }
        );

        if (anyLocationThatMeetWithUserLocation.length > 0) {
            const attendance = await Attendance.create({
                name: name,
                locationId: anyLocationThatMeetWithUserLocation[0].id,
                locationName: anyLocationThatMeetWithUserLocation[0].name,
                latitude: latitude,
                longitude: longitude,
            });

            res.status(200).json({
                status: 200,
                message: `Successfully create Attendance in ${attendance.locationName}`,
                data: attendance,
            } as IStandart);
        } else {
            res.status(201).json({
                status: 201,
                message: `Anda tidak sedang berada dalam radius absensi, Anda ${nearestLocation?.distance}m diluar tempat absensi ${nearestLocation?.locationName}`,
            } as IStandart);
        }
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
