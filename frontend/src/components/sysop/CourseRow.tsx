import React from "react";
import RemoveIcon from "@mui/icons-material/Delete";
import { Course } from "../../classes/Course";

const CourseRow = ({ course, fetchCourseData }: { course: Course; fetchCourseData: Function }) => {

  const handleDeleteCourse = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:3000/api/course/deletecourse",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseNumber: course.courseNumber,
            courseName: course.courseName,
            courseDesc: course.courseDesc,
            courseTerm: course.term,
            courseYear: course.year,
            courseInstructorName: course.instructorName
          }),
        });

        if (res.status === 201) {
          const data = await res.json();
          setTimeout(() => {
            fetchCourseData();
          }, 500);
        } else {
          alert("Error while deleting courses.");
        }
    } 
    catch (err) 
    {
      console.log(err);
    }
  };

  return (
    <tr className="body">
      <td className="column0">
        <button className="btn btn-secondary delete-btn" onClick={handleDeleteCourse}>
          <RemoveIcon/>
        </button>
      </td>
      <td className="column1">{course.courseNumber}</td>
      <td className="column2">{course.courseName}</td>
      <td className="column3">{course.courseDesc}</td>
      <td className="column4">{course.term}</td>
      <td className="column5">{course.year}</td>
      <td className="column6">{course.instructorName}</td>
    </tr>
  );
};

export default CourseRow;
