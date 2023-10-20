import express from 'express';
import { getAllCourses, addCourses, registerCourseFromFile, getCourseInfo, getCoursesFromTermAndYear, deleteCourse} from '../controllers/courseController';
import multer from "multer";
const upload = multer();

const router = express.Router();

router.route("/").get(getAllCourses);
router.route("/:term/:year").get(getCoursesFromTermAndYear);
router.route("/add").post(addCourses);
router.route("/:courseNumber").get(getCourseInfo);
router.route("/upload").post(upload.single("csvFile"), registerCourseFromFile);
router.route("/deletecourse").delete(deleteCourse);


export default router;
