import mongoose from "mongoose";
import { ICourse } from "./Course";
import { IUser } from "./User";

const Schema = mongoose.Schema;

export interface IRating extends mongoose.Document {
    course: ICourse,
    ta: IUser,
    rating: number,
    comments: Array<String>,
    users: Array<IUser>
};

const RatingSchema = new mongoose.Schema({
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },

    ta: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },

    comments: [{
        type: String
    }],

    users: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }]
});

const Rating = mongoose.model<IRating>("Rating", RatingSchema);

export default Rating;
