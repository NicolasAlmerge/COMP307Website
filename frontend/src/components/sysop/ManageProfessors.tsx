import React, { useEffect } from "react";
import AddProfForm from "./AddProfForm";
import ProfRow from "./ProfRow";
import "../../style/userTable.css";
import { Professor } from "../../classes/Professor";
import ImportForm from "./ImportForm";
import { Container } from "react-bootstrap";

const ManageProfessors = () => {
  const [profs, setProfs] = React.useState<Array<Professor>>([]);

  const fetchProfData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/prof");
      const data = await res.json();
      const profObject = [];
      for (const d of data.profs) {
        const instructorRes = await fetch("http://127.0.0.1:3000/api/users/" + d.professor);
        let item = {
          faculty: d.faculty,
          department: d.department,
        }
        if (instructorRes) {
          const instructorData = await instructorRes.json();
          item["firstName"] = instructorData.user.firstName;
          item["lastName"] = instructorData.user.lastName;
          item["email"] = instructorData.user.email;
        } else {
          item["firstName"] = "";
          item["lastName"] = "";
          item["email"] = "";
        }
        profObject.push(item);
      }
      setProfs(profObject);
    } catch (err) {
      console.log(err);
    }
  }; 

  useEffect(() => {
    // Load data
    fetchProfData();
  }, []);

  return (
    <div>
      <ImportForm taskName="Professors" uploadUrl="http://127.0.0.1:3000/api/prof/upload"/>
      <Container className="mt-3">
        <div className="rowC">
          <h2 style={{ marginBottom: "20px" }}>All Professors</h2> 
          <AddProfForm fetchProfData={fetchProfData} />
        </div>
        <div id="profTable">
          <table>
            <thead>
              <tr>
                <th className="column0"></th>
                <th className="column1">Email</th>
                <th className="column2">First name</th>
                <th className="column3">Last name</th>
                <th className="column4">Faculty</th>
                <th className="column5">Department</th>
                <th className="column5">Courses</th>
              </tr>
            </thead>
            <tbody>
              {/**Set to hardcoded list of profs for testing purposes */}
              {profs.map((professor: Professor, i: number) => {
                if (professor) {
                  return <ProfRow key={i} professor={professor} fetchProfData={fetchProfData} />;
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default ManageProfessors;
