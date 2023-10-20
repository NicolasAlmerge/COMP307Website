import React, { useEffect, useState } from "react";
import CourseQuotaRow from "./CourseQuotaRow";
import "../../style/userTable.css";
import ImportForm from "./ImportForm";
import { Container } from "react-bootstrap";
import { CourseQuota } from "../../classes/CourseQuota";

const TaAdminCoursesListed = () => {
  const [courseQuotas, setCourseQuotas] = useState<Array<CourseQuota>>([]);

  const fetchCourseQuotaData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/courseQuota");
      const data = await res.json();
      const courseQuotaObject = [];
      for (const d of data.courseQuotas) {
        let item = {
          term_year: d.term_year,
          course_num: d.course_num,
          course_type: d.course_type,
          course_name: d.course_name, 
          instructor_name: d.instructor_name,
          course_enrollment_num: d.course_enrollment_num, 
          TA_quota: d.TA_quota
        }
        courseQuotaObject.push(item);
      }
      setCourseQuotas(courseQuotaObject);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourseQuotaData();
  }, []);

  return (
    <div>
      <ImportForm taskName="CourseQuota" uploadUrl="http://127.0.0.1:3000/api/courseQuota/upload"/>
      <Container className="mt-3">
        <div className="rowC">
          <h2 style={{ marginBottom: "20px" }}>Course List</h2> 
        </div>
        <div id="courseQuotaTable">
          <table>
            <thead>
              <tr>
                <th className="column0"></th>
                <th className="column1">Term year</th>
                <th className="column2">Course Number</th>
                <th className="column3">Course Type</th>
                <th className="column4">Course Name</th>
                <th className="column5">Instructor Name</th>
                <th className="column6">Course Enrollment Number</th>
                <th className="column7">TA Quota</th>
              </tr>
            </thead>
            <tbody>
              {courseQuotas.map((courseQuota: CourseQuota, i: number) => (
                <CourseQuotaRow key={i} courseQuota={courseQuota} fetchCourseQuotaData={fetchCourseQuotaData} />
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default TaAdminCoursesListed;
