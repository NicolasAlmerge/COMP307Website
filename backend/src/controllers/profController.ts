import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Professor from "../models/Professor";
import Course, { ICourse } from "../models/Course";
import User, { UserTypes } from "../models/User";
import { parse } from 'csv-string';

// @Desc Get all Profs
// @Route /api/prof
// @Method GET
export const getAllProfs = asyncHandler(async (req: Request, res: Response) => {
  const profs = await Professor.find({});
  res.status(200).json({profs});
});


// @Desc Save multiple profs
// @Route /api/prof/upload
// @Method POST
export const registerProfFromFile = asyncHandler(async (req: Request, res: Response) => {
    const csv = req.file;
    if (csv) {
      const fileContent = parse(csv.buffer.toString('utf-8'));
      for (let record of fileContent) {
        const professorEmail = record[0];
        const courseNumber = record[3];
        console.log(professorEmail);
        let instructor = await User.findOne({ email: professorEmail }).select("-password");
        console.log(instructor);
        let course = await Course.findOne({ courseNumber });
        let profExist = await Professor.findOne({professor: instructor});
        if (!instructor ){ // removed || !course
            res.status(404);
            console.log("Instructor or course not found in the database! Skipping row.");
        }
        else if (profExist){
          res.status(409);
          throw new Error("Prof already exists with this email");
        } 
        else {
            const prof = new Professor({ 
                professor: instructor, 
                faculty: record[1], 
                department: record[2], 
                course: course 
            });
            await prof.save();
        }
      }
    } else {
      res.status(500);
      throw new Error("File upload unsuccessful.");
    }
    res.status(200).json({});
  });



// @Desc Add Professor
// @Route /api/prof/add
// @Method POST
export const addProfs = asyncHandler(async (req: Request, res: Response) => {
    const {professorEmail, faculty, department, courseNumbers} = req.body;
    // Also think of the case when the email is not that of a prof, how can you handle it?
    let instructor = await User.findOne({email: professorEmail}).select("-password");
    if (!instructor) {
        res.status(404);
        throw new Error("Instructor not found in the database! Add user and continue.");
    }
    let profExist = await Professor.findOne({professor: instructor});
    if (profExist){
      res.status(409);
      throw new Error("Prof already exists with this email");
    }

    let courses: Array<ICourse> = [];

    /*courseNumbers.forEach(async (courseNumber: string) => {
        let course = await Course.findOne({courseNumber});
        if (!course) {
            res.status(404);
            throw new Error("Course not found in the database! Add course and continue.");
        }
        courses.push(course);
    });*/

    //need to fix courses here still NOTE FOR MYSELF
    const prof = new Professor({ 
        professor: instructor, 
        faculty: faculty, 
        department: department, 
        course: courses
    });

    await prof.save();
    res.status(201).json({
        id: prof._id,
        instructor: prof.professor,
        faculty: prof.faculty,
        term: prof.department,
        course: prof.course,
    });
});

// @Desc Delete prof by ID
// @Route /api/prof/:id
// @Method DELETE
export const deleteProf = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(email);
  let instructor = await User.findOne({email: email});
  console.log(instructor);
  if (!instructor){
    res.status(404);
    throw new Error("Prof not found1");
  }
  let prof = await Professor.findOne({ professor: instructor });
  console.log(prof);
  if(!prof) {
    res.status(404);
    throw new Error("Prof not found");
  }
  await Professor.findOneAndDelete({ professor: instructor });
  res.status(201).json({});
});

// @Desc Edit prof by email
// @Route /api/users/editprof
// @Method POST
export const editProf = asyncHandler(async (req: Request, res: Response) => {
  const {professorEmail, faculty, department, courseNumbers} = req.body;
  let instructor = await User.findOne({email: professorEmail}).select("-password");
  const filter = {professor: instructor};
  const update = {faculty:faculty,department:department,courseNumbers:courseNumbers};
  await Professor.findOneAndUpdate(filter,update);
  res.status(201).json({});
});