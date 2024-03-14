"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const location_route_1 = __importDefault(require("../routes/location_route"));
const attendance_route_1 = __importDefault(require("../routes/attendance_route"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/location', location_route_1.default);
app.use('/api/attendance', attendance_route_1.default);
mongoose_1.default
    .connect(`${process.env.MONGODB_CONNECTION_STRING}`)
    .then(() => {
    console.log('connected to mongodb');
    app.listen(3000, () => {
        console.log('server is running on 3000');
    });
})
    .catch(() => {
    console.log('connection failed');
});
