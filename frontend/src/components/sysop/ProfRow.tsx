import React, { useState, useEffect } from "react";
import RemoveIcon from "@mui/icons-material/Delete";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import "../../style/userTable.css";
import { Professor } from "../../classes/Professor";
import { Course } from "../../classes/Course";
import { Edit } from "@mui/icons-material";
import { Modal } from "react-bootstrap";
import { Button, Form, Row, Col } from "react-bootstrap";

const ProfRow = ({ professor, fetchProfData }: { professor: Professor; fetchProfData: Function }) => {
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState<Array<Course>>([]); //need to add to course list still
  const [tempEmail, setTempEmail] = useState<string>(professor.email);
  const [tempFaculty, setTempFaculty] = useState<string>(professor.faculty);
  const [tempDept, setTempDept] = useState<string>(professor.department);
  const [tempCourses, setTempCourses] = useState<string>();

  const handleDeleteProf = async () => {
    try {
      
      const res = await fetch(
        "http://127.0.0.1:3000/api/prof/deleteprof",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: professor.email,
          }),
        });

        if (res.status === 201) {
          const data = await res.json();
          setTimeout(() => {
            fetchProfData();
          }, 500);
        } else {
          alert("Error while deleting the prof.");
        }
    } 
    catch (err) 
    {
      console.log(err);
    }
  };

  const handleEditProf = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:3000/api/prof/editprof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          professorEmail: tempEmail,
          faculty: tempFaculty,
          department: tempDept,
          courseNumbers: [tempCourses]
        }),
      });
      if (res.status === 201) {
        const data = await res.json();
        setTimeout(() => {
          fetchProfData();
        }, 500);
      } 
      else {
        alert("Error while editing professor details.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr className="body">
      <td className="column0">
        <button className="btn btn-secondary delete-btn" onClick={handleDeleteProf}>
          <RemoveIcon />
        </button>
        <button className="btn btn-secondary edit-btn" onClick={() => setShow(true)}>
          <Edit/>
        </button>
        <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-lg" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Add a Professor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditProf}>
            <Row>
              <Col>
                <Form.Control required type="email" placeholder="Instructor Email" disabled value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Select required onChange={(e) => setTempFaculty(e.target.value)}>
                  <option value="">Select a Faculty...</option>
                  <option value="Science">Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Arts">Arts</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Select required onChange={(e) => setTempDept(e.target.value)}>
                  <option value="">Select a Department...</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control required type="string" placeholder="Course Number" value={tempCourses} onChange={(e) => setTempCourses(e.target.value)} />
              </Col>
            </Row>
            <Button className="mt-3" variant="light" type="submit" onClick={() => setShow(false)}>
              Edit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      </td>
      <td className="column1">{professor.email}</td>
      <td className="column2">{professor.firstName}</td>
      <td className="column3">{professor.lastName}</td>
      <td className="column4">{professor.faculty}</td>
      <td className="column5">{professor.department}</td>
      <td className="column6 course-button">
      <>
        <button className="courses"> {/*onClick={() => setShow(true)} --> might need to add back later*/}
          <OpenInFullIcon fontSize="small" /> View Courses
        </button>
      </>
      </td>
    </tr>
  );
};

export default ProfRow;
