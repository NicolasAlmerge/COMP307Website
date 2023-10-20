import React, { useEffect, useState } from "react";
import { TaCohort } from "../../classes/TaCohort";

const TaCohortRow = ({ taCohort, fetchTaCohortData }: { taCohort: TaCohort; fetchTaCohortData: Function }) => {

  return (
    <tr className="body">
        <td className="column0">{taCohort.term_year}</td>
        <td className="column1">{taCohort.TA_name}</td>
        <td className="column2">{taCohort.student_ID}</td>
        <td className="column3">{taCohort.legal_name}</td>
        <td className="column4">{taCohort.email}</td>
        <td className="column5">{taCohort.grad_ugrad}</td>
        <td className="column6">{taCohort.supervisor_name}</td>
        <td className="column7">{taCohort.priority}</td>
        <td className="column8">{taCohort.hours}</td>
        <td className="column9">{taCohort.date_applied}</td>
        <td className="column10">{taCohort.location}</td>
        <td className="column11">{taCohort.phone}</td>
        <td className="column12">{taCohort.degree}</td>
        <td className="column13">{taCohort.courses_applied_for_list}</td>
        <td className="column14">{taCohort.open_to_other_courses}</td>
        <td className="column15">{taCohort.notes}</td>
    </tr>
  );
};

export default TaCohortRow;
