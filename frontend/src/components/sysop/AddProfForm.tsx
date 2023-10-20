import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import "../../style/userTable.css";

function AddProfForm({ fetchProfData }) {
  const [show, setShow] = useState(false);
  const [tempEmail, setTempEmail] = useState<string>();
  const [tempFaculty, setTempFaculty] = useState<string>("Science");
  const [tempDept, setTempDept] = useState<string>("Computer Science");
  const [tempCourses, setTempCourses] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:3000/api/prof/add", {
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
      else if(res.status === 409){
        alert("Prof with that email already exists.");
      }
      else {
        alert("Error while adding professor details.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button className="mb-4 mt-2" onClick={() => setShow(true)}>
        <AddIcon />
      </button>

      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-lg" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Add a Professor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Control required type="email" placeholder="Instructor Email" value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} />
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
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddProfForm;
