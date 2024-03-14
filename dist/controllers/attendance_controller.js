"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendanceHistory = exports.addAttendance = void 0;
const helper_1 = require("../utils/helper");
const attendance_models_1 = __importDefault(require("../models/attendance_models"));
const location_model_1 = __importDefault(require("../models/location_model"));
function distanceInMeter(lat, lng, latTarget, lngTarget) {
    let dLat = ((lat - latTarget) * Math.PI) / 180;
    let dLon = ((lng - lngTarget) * Math.PI) / 180;
    var a = 0.5 -
        Math.cos(dLat) / 2 +
        (Math.cos((latTarget * Math.PI) / 180) *
            Math.cos((lat * Math.PI) / 180) *
            (1 - Math.cos(dLon))) /
            2;
    let d = Math.round(6371000 * 2 * Math.asin(Math.sqrt(a)));
    return d;
}
const addAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const locations = yield location_model_1.default.find();
        const { latitude, longitude, name } = req.body;
        let nearestLocation;
        const anyLocationThatMeetWithUserLocation = locations.filter((element) => {
            const distance = distanceInMeter(element.latitude, element.longitude, latitude, longitude);
            console.log(`distance ${element.name} ==> ${distance}`);
            if (nearestLocation === undefined) {
                nearestLocation = {
                    locationName: element.name,
                    distance: distance,
                };
            }
            else {
                if (distance < nearestLocation.distance) {
                    nearestLocation = {
                        locationName: element.name,
                        distance: distance,
                    };
                }
            }
            return distance <= 50;
        });
        if (anyLocationThatMeetWithUserLocation.length > 0) {
            const attendance = yield attendance_models_1.default.create({
                name: name,
                distance: (_a = nearestLocation === null || nearestLocation === void 0 ? void 0 : nearestLocation.distance) !== null && _a !== void 0 ? _a : 0,
                locationId: anyLocationThatMeetWithUserLocation[0].id,
                locationName: anyLocationThatMeetWithUserLocation[0].name,
                latitude: latitude,
                longitude: longitude,
            });
            res.status(200).json({
                status: 200,
                message: `Successfully create Attendance in ${attendance.locationName}`,
                data: attendance,
            });
        }
        else {
            res.status(201).json({
                status: 201,
                message: `Anda tidak sedang berada dalam radius absensi, Anda ${nearestLocation === null || nearestLocation === void 0 ? void 0 : nearestLocation.distance}m diluar tempat absensi ${nearestLocation === null || nearestLocation === void 0 ? void 0 : nearestLocation.locationName}`,
            });
        }
    }
    catch (error) {
        (0, helper_1.sendError)(res, (0, helper_1.handleStatus)(error), (0, helper_1.handleError)(error));
    }
});
exports.addAttendance = addAttendance;
const getAttendanceHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendance = yield attendance_models_1.default.find();
        res.status(200).json({
            status: 200,
            message: 'Successfully fetch attendance',
            data: attendance,
        });
    }
    catch (error) {
        (0, helper_1.sendError)(res, (0, helper_1.handleStatus)(error), (0, helper_1.handleError)(error));
    }
});
exports.getAttendanceHistory = getAttendanceHistory;
