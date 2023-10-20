import express from 'express';
import { getAllProfs, addProfs, registerProfFromFile, deleteProf, editProf} from '../controllers/profController';
import multer from "multer";

const upload = multer();
const router = express.Router();

router.route("/").get(getAllProfs);
router.route("/add").post(addProfs);
router.route("/upload").post(upload.single("csvFile"), registerProfFromFile);
router.route("/deleteprof").delete(deleteProf);
router.route("/editprof").post(editProf);

export default router;
