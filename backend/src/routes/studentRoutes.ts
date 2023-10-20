import express from "express";
import { getAllStudents, registerNewStudent } from "../controllers/studentController";

const router = express.Router();

router.route("/").get(getAllStudents);
router.route("/add").post(registerNewStudent);

export default router;
