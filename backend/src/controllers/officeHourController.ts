import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Course from "../models/Course";
import OfficeHour from "../models/OfficeHour";

// Check if element is in the list
const isInList = (element: any, list: Array<any>) => {
    const str = element.toString();
    for (let elem of list) {
        if (str === elem.toString()) return true;
    }
    return false;
}

// @Desc Get all OHS for a course
// @Route /api/oh/:courseId
// @Method GET
export const getAllOHForCourse = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    let ohs = await OfficeHour.find({course: courseId});
    const courseInfo = await Course.findById(courseId);
    if (!courseInfo) {
        res.status(404).json({error: "Course not found!"});
        return;
    }

    let ohUsersId = [];
    for (let oh of ohs) {
        ohUsersId.push(oh.user._id);
    }

    let allUsers = []
    for (let ta of courseInfo.tas) {
        allUsers.push(ta._id);
    }
    allUsers.push(courseInfo.courseInstructor._id);

    for (let ta of allUsers) {
        if (!isInList(ta, ohUsersId)) {
            const newOH = new OfficeHour({
                course: courseId,
                user: ta,
                hours: "",
                location: "",
                duties: ""
            })
            await newOH.save();
            ohs.push(newOH);
        }
    }
    res.status(200).json(ohs);
});
