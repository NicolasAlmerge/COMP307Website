import mongoose from 'mongoose';
import { ICourse } from './Course';
import { IUser } from './User';

const Schema = mongoose.Schema;

export interface IOfficeHour extends mongoose.Document {
    course: ICourse,
    user: IUser,
    hours: String,
    location: String,
    duties: String,
};

const OfficeHourSchema = new mongoose.Schema({
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },

    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Student",
    },

    hours: {
        type: String
    },

    location: {
        type: String
    },

    duties: {
        type: String
    }
}, {
    timestamps: true
})

const OfficeHour = mongoose.model<IOfficeHour>("OfficeHour", OfficeHourSchema);

export default OfficeHour;
