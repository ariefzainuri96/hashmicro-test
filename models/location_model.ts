import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter location name!'],
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

const Location = mongoose.model('Location', LocationSchema);

export default Location;
