import React, { useEffect, useState } from "react";
import TaCohortRow from "./TaCohortRow";
import "../../style/userTable.css";
import ImportForm from "./ImportForm";
import { Container } from "react-bootstrap";
import { TaCohort } from "../../classes/TaCohort";

const  ManageTaInfoHistory = () => {
  const [taCohorts, setTaCohorts] = useState<Array<TaCohort>>([]);

  const fetchTaCohortData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/tacohort");
      const data = await res.json();
      const taCohortObject = [];
      for (const d of data.taCohorts) {
        let item = {
            term_year: d.term_year,
            TA_name: d.TA_name,
            student_ID: d.student_ID,
            legal_name: d.legal_name,
            email: d.email,
            grad_ugrad: d.grad_ugrad,
            supervisor_name: d.supervisor_name,
            priority: d.priority,
            hours: d.hours,
            date_applied: d.date_applied,
            location: d.location,
            phone: d.phone,
            degree: d.degree,
            courses_applied_for_list: d.courses_applied_for_list,
            open_to_other_courses: d.open_to_other_courses,
            notes: d.notes
        }
        taCohortObject.push(item);
      }
      setTaCohorts(taCohortObject);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTaCohortData();
  }, []);

  return (
    <div>
      <ImportForm taskName="TaCohort" uploadUrl="http://127.0.0.1:3000/api/tacohort/upload"/>
      <Container className="mt-3">
        <div className="rowC">
          <h2 style={{ marginBottom: "20px" }}>TA List</h2> 
        </div>
        <div id="taCohortTable">
          <table>
            <thead>
              <tr>
                <th className="column0">Term year</th>
                <th className="column1">TA name</th>
                <th className="column2">Student ID</th>
                <th className="column3">Legal Name</th>
                <th className="column4">Email</th>
                <th className="column5">Grad/UGrad</th>
                <th className="column6">Supervisor Name</th>
                <th className="column7">Priority</th>
                <th className="column8">Hours</th>
                <th className="column9">Date Applied</th>
                <th className="column10">Location</th>
                <th className="column11">Phone</th>
                <th className="column12">Degree</th>
                <th className="column13">Courses Applied</th>
                <th className="column14">Other Courses</th>
                <th className="column15">Notes</th>
              </tr>
            </thead>
            <tbody>
              {taCohorts.map((taCohort: TaCohort, i: number) => (
                <TaCohortRow key={i} taCohort={taCohort} fetchTaCohortData={fetchTaCohortData} />
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default ManageTaInfoHistory;