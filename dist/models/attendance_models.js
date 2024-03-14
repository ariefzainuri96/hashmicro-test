"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AttendanceSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please enter employee name!'],
    },
    distance: {
        type: Number,
        required: true,
    },
    locationId: {
        type: String,
        required: true,
    },
    locationName: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: [true, 'Please enter latitude!'],
    },
    longitude: {
        type: Number,
        required: [true, 'Please enter longitude!'],
    },
}, {
    timestamps: true,
});
const Attendance = mongoose_1.default.model('Attendance', AttendanceSchema);
exports.default = Attendance;
