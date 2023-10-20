import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { parse } from 'csv-string';
import TaCohort from "../models/TaCohort";

// @Desc Get all TaCohorts
// @Route /api/tacohort
// @Method GET
export const getAllTaCohorts = asyncHandler(async (_: Request, res: Response) => {
  // Get courseQuotas
  const taCohorts = await TaCohort.find({});

  // Return courseQuotas
  res.status(200).json({taCohorts});
});


// @Desc Save multiple TaCohorts
// @Route /api/tacohort/upload
// @Method POST
export const registerTaCohortFromFile = asyncHandler(async (req: Request, res: Response) => {
    const csv = req.file;
    if (csv) {
      const fileContent = parse(csv.buffer.toString('utf-8'));
      for (let record of fileContent) {
        let checkifExist = await TaCohort.findOne({ term_year: record[0],
            TA_name: record[1],
            student_ID: record[2],
            legal_name: record[3],
            email: record[4],
            grad_ugrad: record[5],
            supervisor_name: record[6],
            priority: record[7],
            hours: record[8],
            date_applied: record[9],
            location: record[10],
            phone: record[11],
            degree: record[12],
            courses_applied_for_list: record[13],
            open_to_other_courses: record[14],
            notes: record[15]});
            
        if (!checkifExist){
            const taCohort = new TaCohort({
                term_year: record[0],
                TA_name: record[1],
                student_ID: record[2],
                legal_name: record[3],
                email: record[4],
                grad_ugrad: record[5],
                supervisor_name: record[6],
                priority: record[7],
                hours: record[8],
                date_applied: record[9],
                location: record[10],
                phone: record[11],
                degree: record[12],
                courses_applied_for_list: record[13],
                open_to_other_courses: record[14],
                notes: record[15]
            });
            await taCohort.save(); 
        }
        }
      }
     else {
      res.status(500);
      throw new Error("File upload unsuccessful.");
    }
    res.status(200).json({});
});