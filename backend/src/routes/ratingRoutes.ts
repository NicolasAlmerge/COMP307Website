import express from "express";
import { getStudentCourseRatings, putCourseStudentRating } from '../controllers/ratingController';

const router = express.Router();

router.route("/students/:courseId/:taId").get(getStudentCourseRatings);
router.route("/students/:courseId/:taId").put(putCourseStudentRating);

export default router;
