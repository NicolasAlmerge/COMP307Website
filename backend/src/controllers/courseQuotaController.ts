import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { parse } from 'csv-string';
import CourseQuota from "../models/CourseQuota";


// @Desc Get all CourseQuota
// @Route /api/coursequota
// @Method GET
export const getAllCourseQuotas = asyncHandler(async (_: Request, res: Response) => {
  // Get courseQuotas
  const courseQuotas = await CourseQuota.find({});

  // Return courseQuotas
  res.status(200).json({courseQuotas});
});


// @Desc Save multiple courseQuotas
// @Route /api/courseQuota/upload
// @Method POST
export const registerCourseQuotaFromFile = asyncHandler(async (req: Request, res: Response) => {
    const csv = req.file;
    if (csv) {
      const fileContent = parse(csv.buffer.toString('utf-8'));
      for (let record of fileContent) {
        let checkifExist = await CourseQuota.findOne({ term_year: record[0],course_num: record[1],course_type: record[2],course_name: record[3], instructor_name: record[4],course_enrollment_num: record[5], TA_quota: record[6]});
        if (!checkifExist){
            const courseQuota = new CourseQuota({ 
                term_year: record[0],
                course_num: record[1],
                course_type: record[2],
                course_name: record[3], 
                instructor_name: record[4],
                course_enrollment_num: record[5], 
                TA_quota: record[6]
            });
            await courseQuota.save();
            console.log(courseQuota); 
        }
        }
      }
     else {
      res.status(500);
      throw new Error("File upload unsuccessful.");
    }
    res.status(200).json({});
});