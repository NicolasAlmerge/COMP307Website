import mongoose from "mongoose";
import { ICourse } from "./Course";
import { IUser } from "./User";
const Schema = mongoose.Schema;

export interface IStudent extends mongoose.Document {
    student: IUser,
    studentIDNumber: string,
    courses: Array<ICourse>
}

const StudentSchema = new mongoose.Schema({
    student: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    studentIDNumber: {
        type: String,
        required: true,
    },

    courses: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    }]
}, {
    timestamps: true
})

const Student = mongoose.model<IStudent>("Student", StudentSchema);

export default Student;
