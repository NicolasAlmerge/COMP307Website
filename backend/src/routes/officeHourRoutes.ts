import express from 'express';
import { getAllOHForCourse } from '../controllers/officeHourController';

const router = express.Router();

router.route("/:courseId").get(getAllOHForCourse);

export default router;
