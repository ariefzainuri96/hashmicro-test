import express from 'express';
import mongoose from 'mongoose';
import locationRoutes from '../routes/location_route';
import attendanceRoutes from '../routes/attendance_route';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.use('/api/location', locationRoutes);
app.use('/api/attendance', attendanceRoutes);

mongoose
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
