import mongoose from 'mongoose';
import { ICourse } from './Course';
import { IUser } from './User';

const Schema = mongoose.Schema;

export interface ICourseTAs extends mongoose.Document {
    term_year: string,
    course_num: string,
    TA_name: string,
    student_id: string,
    email: string,
    assigned_hours: string
};

const CourseTAsSchema = new mongoose.Schema({

    term: {
        type: String
    },

    year:{
        type: String
    },

    course_num: {
        type: String
    },

    TA_name: {
        type: String
    },

    student_id: {
        type: String
    },

    email: {
        type: String
    },

    assigned_hours: {
        type: String
    }
}, {
    timestamps: true
})

const CourseTAs = mongoose.model<ICourseTAs>("CourseTAs", CourseTAsSchema);

export default CourseTAs;
