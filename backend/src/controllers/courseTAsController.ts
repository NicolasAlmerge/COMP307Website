import CourseTAs from "../models/CourseTAs";
import User from "../models/User";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { parse } from 'csv-string';

// @Desc Register TA to the course
// @Route /api/courseTAs/register
// @Method POST
export const register = asyncHandler(async (req: Request, res: Response) => {
    const { term_year, course_num, TA_name, student_id, email, assigned_hours } = req.body;
    const userExist = await User.findOne({email: email});
    if (!userExist){
      res.status(409);
      throw new Error("User doesn't exist!");
    }
    const courseTA = new CourseTAs({ term_year, course_num, TA_name, student_id, email, assigned_hours });
    await courseTA.save();
    res.status(201).json({
        term_year: courseTA.term_year, 
        course_num: courseTA.course_num, 
        TA_name: courseTA.TA_name, 
        student_id: courseTA.student_id, 
        email: courseTA.email, 
        assigned_hours: courseTA.assigned_hours,

    });
  });

// @Desc Get all CourseTAs
// @Route /api/courseTAs/get/:course_num
// @Method GET
export const getCourseTAsFromCourseNum = asyncHandler(async (req: Request, res: Response) => {
    let courseNumber = req.params.course_num

    // Get courses
    const courseTAs = await CourseTAs.find({course_num: courseNumber});

    // Return courses
    res.status(200).json({courseTAs});
});