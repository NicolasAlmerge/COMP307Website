import express from 'express';
import {register, login, getAllUsers, getUserByID, registerUsersFromFile, deleteUser, editUser} from '../controllers/userController';
import multer from "multer";

const upload = multer();

const router = express.Router();

router.route("/:id").get(getUserByID);
router.route("/").get(getAllUsers);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/upload").post(upload.single("csvFile"), registerUsersFromFile);
router.route("/deleteuser").delete(deleteUser);
router.route("/edituser").post(editUser);

export default router;