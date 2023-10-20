import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Course, { ICourse, Term } from "../models/Course";
import User from "../models/User";
import { parse } from 'csv-string';
import Professor from "../models/Professor";

// Sort courses by course number
const sortCoursesByNumber = (courses: Array<ICourse>) => {
    courses.sort((a, b) => a.courseNumber.localeCompare(b.courseNumber));
}

// Sort courses by course number
const sortCoursesByTerm = (courses: Array<ICourse>) => {
    // Winter = 0, Summer = 1, Fall = 2
    const termVal = (t: Term) => ((t == Term.Fall)? 2: (t == Term.Winter)? 0: 1);
    courses.sort((a, b) => termVal(a.term) - termVal(b.term));
}

// @Desc Get all Courses
// @Route /api/course
// @Method GET
export const getAllCourses = asyncHandler(async (_: Request, res: Response) => {
    // Get courses
    const courses = await Course.find({});

    // Sort courses by course number first, then term, then year
    sortCoursesByNumber(courses);
    sortCoursesByTerm(courses);
    courses.sort((a, b) => +a.year - (+b.year));

    // Return courses
    res.status(200).json({courses});
});

// @Desc Get all information from a course with term and year
// @Route /api/course/:courseNumber
// @Method GET
export const getCourseInfo = asyncHandler(async (req: Request, res: Response) => {
    const courseName = req.params.courseNumber;
    const {term, year} = req.body;
    const course = await Course.findOne({courseNumber: courseName, term: term, year: year});
    if (!course) {
        res.status(404);
        throw new Error("Course with term not found!");
    }

    res.status(200).json({course});
});


// @Desc Add a TA user to a course with term and year
// @Route /api/course/:courseNumber
// @Method POST
export const addTAtoCourse = asyncHandler(async (req: Request, res: Response) => {
    const courseName = req.params.courseNumber;
    const {term, year, TAUser} = req.body;
    const course = await Course.findOne({courseNumber: courseName, term: term, year: year});
    let Ta = await User.findOne({email: TAUser.email});
    console.log(Ta);
    if (!Ta){
        res.status(500);
        throw new Error("TA user not found!");
    }
    if (!course) {
        res.status(404);
        throw new Error("Course with term not found!");
    }
    let TAexist = false;
    for (let i = 0; i < course.tas.length; i++){
        if(course.tas[i].email === Ta.email){
            TAexist = true;
        }
    }
    if (TAexist) {
        res.status(409);
        throw new Error("TA already exists!")
    }
    course.tas.push(Ta);
    res.status(200).json({course});
});

// @Desc Remove a TA user from a course with term and year
// @Route /api/course/:courseNumber
// @Method DELETE
export const DelTAfromCourse = asyncHandler(async (req: Request, res: Response) => {
    const courseName = req.params.courseNumber;
    const {term, year, TAUser} = req.body;
    const course = await Course.findOne({courseNumber: courseName, term: term, year: year});
    let Ta = await User.findOne({email: TAUser.email});
    console.log(Ta);
    if (!Ta){
      res.status(500);
      throw new Error("TA user not found!");
    }
    if (!course) {
        res.status(404);
        throw new Error("Course with term not found!");
    }
    let index = -1;
    for (let i = 0; i < course.tas.length; i++){
        if(course.tas[i].email === Ta.email){
            index = i;
        }
    }
    if(index == -1){
        throw new Error("TA user not found!");
    }
    else{
        course.tas = course.tas.splice(index, 1);
    }

    res.status(200).json({course});
});

// @Desc Get all Courses
// @Route /api/course/:term/:year
// @Method GET
export const getCoursesFromTermAndYear = asyncHandler(async (req: Request, res: Response) => {
    let term = req.params.term;
    const year = req.params.year;

    // Capitalise term
    if (term) term = term.charAt(0).toUpperCase() + term.toLowerCase().substring(1);

    // Get courses
    const courses = await Course.find({term: term, year: year});

    // Sort courses by course number
    sortCoursesByNumber(courses);

    // Return courses
    res.status(200).json({courses});
});


// @Desc Save multiple courses
// @Route /api/course/upload
// @Method POST
export const registerCourseFromFile = asyncHandler(async (req: Request, res: Response) => {
    const csv = req.file;
    if (csv) {
      const fileContent = parse(csv.buffer.toString('utf-8'));
      for (let record of fileContent) {
        const instructorEmail = record[5];
        let courseInstructor = await User.findOne({ email:instructorEmail }).select("-password");
        let courseExist = await Course.findOne({courseInstructor: courseInstructor, term: record[2], courseName: record[0], year: record[3]});
        if (!courseInstructor) {
            res.status(404);
            console.log("Instructor not found in the database! Skipping row.");
        } 
        else if (courseExist){
            res.status(409);
            throw new Error("Instructor already teaching this gvien course at the same term and year.");
        }
        else {
            const course = new Course({ 
                courseName: record[0],
                courseDesc: record[1],
                term: record[2],
                year: record[3],
                courseNumber: record[4],
                courseInstructor: courseInstructor
            });
            course.save(); // can be made concurrent
        }
      }
    } else {
      res.status(500);
      throw new Error("File upload unsuccessful.");
    }
    res.status(200).json({});
});


// @Desc Add Courses
// @Route /api/course/add
// @Method POST
export const addCourses = asyncHandler(async (req: Request, res: Response) => {
    const { courseName, courseDesc, term, year, courseNumber, instructorEmail } = req.body;
    console.log(instructorEmail);
    let courseInstructor = await User.findOne({ email: instructorEmail }).select("-password");
    console.log(courseInstructor);
    if (!courseInstructor) {
        res.status(404);
        throw new Error("Instructor not found in the database! Add user and continue.");
    }
    let courseExist = await Course.findOne({courseInstructor: courseInstructor, term: term, courseName: courseName, year: year});
    if (courseExist){
        res.status(409);
        throw new Error("Instructor already teaching this given course at the same term and year.");
    }
    const course = new Course({ courseName, courseDesc, term, year, courseNumber, courseInstructor });
    await course.save();
    res.status(201).json({
        id: course._id,
        courseName: course.courseName,
        courseDesc: course.courseDesc,
        term: course.term,
        year: course.year,
        courseNumber: course.courseNumber,
        instructor: course.courseInstructor
    });
});

// @Desc Delete Course
// @Route /api/course/:id
// @Method DELETE
export const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseName, courseDesc, term, year, courseNumber, instructorName } = req.body;
    let course = await Course.findOne({ courseName: courseName, courseDesc: courseDesc, courseTerm: term, CourseYear: year, courseNumber: courseNumber, courseInstructorName: instructorName });
    console.log(course);
    if(!course) {
        res.status(404);
        throw new Error("Course not found");
    }
    await Course.findOneAndDelete({ courseNumber: courseNumber });
    res.status(201).json({});
});