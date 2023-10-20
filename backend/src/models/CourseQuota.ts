import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ICourseQuota extends mongoose.Document {
    term_year: number,
    course_num: string,
    course_type: string,
    course_name: string, 
    instructor_name: string,
    course_enrollment_num: number, 
    TA_quota: number
}

const CourseQuotaSchema = new mongoose.Schema({
    term_year: {
        type: Number,
        required: true,
    },

    course_num: {
        type: String,
        required: true,
    },

    course_type: {
        type: String,
        required: true,
    },

    course_name: {
        type: String,
        required: true,
    },

    instructor_name: {
        type: String,
        required: true,
    },

    course_enrollment_num: {
        type: Number,
        required: true,
    },

    TA_quota: {
        type: Number,
        required: true,
    }
})

const CourseQuota = mongoose.model<ICourseQuota>("CourseQuota", CourseQuotaSchema);

export default CourseQuota;