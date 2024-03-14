import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema(
    {
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
    },
    {
        timestamps: true,
    }
);

const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;
