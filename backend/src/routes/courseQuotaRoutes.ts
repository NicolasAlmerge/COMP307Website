import express from "express";
import { getAllCourseQuotas, registerCourseQuotaFromFile } from '../controllers/courseQuotaController';
import multer from "multer";

const upload = multer();

const router = express.Router();

router.route("/").get(getAllCourseQuotas);
router.route("/upload").post(upload.single("csvFile"), registerCourseQuotaFromFile);

export default router;