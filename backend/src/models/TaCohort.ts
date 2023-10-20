import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export enum Term {
    Fall = "fall",
    Winter = "winter",
    Summer = "summer"
};

export interface ITaCohort extends mongoose.Document {
    term_year: number,
    TA_name: string,
    student_ID: number,
    legal_name: string,
    email: string,
    grad_ugrad: string,
    supervisor_name: string,
    priority: string,
    hours: number,
    date_applied: string,
    location: string,
    phone: string,
    degree: string,
    courses_applied_for_list: string,
    open_to_other_courses: string,
    notes: string

}

const TaCohortSchema = new mongoose.Schema({
    term_year: {
        type: Number,
        required: true,
    },

    TA_name: {
        type: String,
        required: true,
    },

    student_ID: {
        type: Number,
        required: true,
    },

    legal_name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    grad_ugrad: {
        type: String,
        required: true,
    },

    supervisor_name: {
        type: String,
        required: true,
    },

    priority: {
        type: String,
        required: true,
    },

    hours: {
        type: Number,
        required: true,
    },

    date_applied: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    degree: {
        type: String,
        required: true,
    },

    courses_applied_for_list: {
        type: String,
        required: true,
    },

    open_to_other_courses: {
        type: String,
        required: true,
    },

    notes: {
        type: String,
        required: true,
    }

})

const TaCohort = mongoose.model<ITaCohort>("TaCohort", TaCohortSchema);

export default TaCohort;