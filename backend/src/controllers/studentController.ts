import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Student from "../models/Student";
import Course from "../models/Course";
import User from "../models/User";
import { register } from "./userController";


// @Desc Get all Students
// @Route /api/students
// @Method GET
export const getAllStudents = asyncHandler(async (_: Request, res: Response) => {
  const students = await Student.find({});
  res.status(200).json({students});
});


// @Desc Register new student
// @Route /api/students/add
// @Method POST
export const registerNewStudent = asyncHandler(async (req: Request, res: Response) => {
    const {firstName, lastName, email, password, userType, IDNumber, courses} = req.body;
    let studentUser = await User.findOne({email}).select("-password");
    if (!studentUser) {
        studentUser = new User({firstName, lastName, email, password, userType});
        await studentUser.save();
    }

    courses.forEach(async (courseNumber: string) => {
        let course = await Course.findOne({courseNumber});
        if (!course) {
            res.status(404);
            throw new Error({courseNumber}+" not found in the database! Add course and continue.");
        }
    })

    const stud = new Student({ 
        student: studentUser, 
        studentIDNumber: IDNumber,
        courses: courses 
    });

    await stud.save();
    res.status(201).json({
        id: stud._id,
        student: studentUser, 
        studentIDNumber: IDNumber,
        courses: courses
    });
});
