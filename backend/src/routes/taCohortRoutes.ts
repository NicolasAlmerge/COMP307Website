import express from "express";
import { getAllTaCohorts, registerTaCohortFromFile } from '../controllers/taCohortController';
import multer from "multer";

const upload = multer();

const router = express.Router();

router.route("/").get(getAllTaCohorts);
router.route("/upload").post(upload.single("csvFile"), registerTaCohortFromFile);

export default router;