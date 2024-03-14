"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attendance_controller_1 = require("../controllers/attendance_controller");
const router = express_1.default.Router();
// add attendance
router.post('/', attendance_controller_1.addAttendance);
// get attendance history
router.get('/', attendance_controller_1.getAttendanceHistory);
exports.default = router;
