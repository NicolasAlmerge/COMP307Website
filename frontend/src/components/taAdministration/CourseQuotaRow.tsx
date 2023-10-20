import React, { useEffect, useState } from "react";
import { CourseQuota } from "../../classes/CourseQuota";
import { Edit } from "@mui/icons-material";

const CourseQuotaRow = ({ courseQuota, fetchCourseQuotaData }: { courseQuota: CourseQuota; fetchCourseQuotaData: Function }) => {

  const [show, setShow] = useState(false);

  useEffect(() => {
    const result = Number(courseQuota.course_enrollment_num) / Number(courseQuota.TA_quota);
    if (Number(result) < 30 || Number(result) > 45){
      setShow(true);
    }
  });

  return (
    <tr className="body">
      <td className="column0">
      {show &&
        <button className="btn btn-secondary edit-btn" disabled>
          <Edit/>
        </button>
      }
      </td>
      <td className="column1">{courseQuota.term_year}</td>
      <td className="column2">{courseQuota.course_num}</td>
      <td className="column3">{courseQuota.course_type}</td>
      <td className="column4">{courseQuota.course_name}</td>
      <td className="column5">{courseQuota.instructor_name}</td>
      <td className="column6">{courseQuota.course_enrollment_num}</td>
      <td className="column7">{courseQuota.TA_quota}</td>
    </tr>
  );
};

export default CourseQuotaRow;
