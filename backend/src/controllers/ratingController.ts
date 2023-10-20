import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Rating from "../models/Rating";


// @Desc Get average students rating for a course
// @Route /api/ratings/students/:courseId/:taId
// @Method GET
export const getStudentCourseRatings = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const taId = req.params.taId;
    const rating = await Rating.findOne({course: courseId, ta: taId});

    if (!rating) {
        res.status(200).json({course: courseId, ta: taId, rating: NaN, comments: [], users: []});
        return;
    }

    res.status(200).json(rating);
});


// @Desc Add a new student rating for a course
// @Route /api/ratings/students/:courseId/:taId
// @Method PUT
export const putCourseStudentRating = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const taId = req.params.taId;
    const {newRating, newComment, requesterId} = req.body;
    let rating = await Rating.findOne({course: courseId, ta: taId});

    if (!rating) {
        rating = new Rating({
            course: courseId,
            ta: taId,
            rating: newRating,
            comments: [newComment],
            users: [requesterId]
        });
        await rating.save();
        res.status(200).json(rating);
        return;
    }

    if (rating.users.includes(requesterId)) {
        res.status(403).json({errorMessage: "You have already rated this TA!"});
        return;
    }

    rating.rating = (rating.rating * rating.users.length + newRating) / (rating.users.length + 1);
    rating.comments.push(newComment);
    rating.users.push(requesterId);
    await rating.save();
    res.status(200).json(rating);
});
