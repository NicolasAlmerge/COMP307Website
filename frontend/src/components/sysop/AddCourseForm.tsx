import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import "../../style/userTable.css";

// Form that adds a course with fields: courseCode, courseNumber, courseName, term, year
const AddCourseForm = ({ fetchCourseData }) => {
  const [show, setShow] = React.useState(false);
  const [courseDesc, setCourseDesc] = React.useState("");
  const [courseNumber, setCourseNumber] = React.useState("");
  const [courseName, setCourseName] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [year, setYear] = React.useState("");
  const [instructor, setInstructor] = React.useState("");

  const handleAddCourse = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:3000/api/course/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseDesc: courseDesc,
          courseNumber: courseNumber,
          courseName: courseName,
          term: term,
          year: year,
          instructorEmail: instructor
        }),
      });
      if (res.status === 201) {
        setTimeout(() => {
          fetchCourseData();
          setShow(false);
        }, 500);
      }
      else if(res.status === 409){
        alert("Error prof already teaching this gvien course at the same term and year with that email already exists.");
      }
      else {
        alert("Error while adding course details.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button className="mb-4 mt-2" onClick={() => setShow(true)}>
        <AddIcon/>
      </button>

      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-lg" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Add a Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCourse}>
            <Row>
              <Col>
                <Form.Control required type="courseNumber" placeholder="Please enter the course number." value={courseNumber} onChange={(e) => setCourseNumber(e.target.value)}/>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="courseName" placeholder="Please enter the course name." value={courseName} onChange={(e) => setCourseName(e.target.value)}/>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="courseDesc" placeholder="Please enter the course description." value={courseDesc} onChange={(e) => setCourseDesc(e.target.value)}/>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="term" placeholder="Please enter the course term." value={term} onChange={(e) => setTerm(e.target.value)}/>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="year" placeholder="Please enter the course year." value={year} onChange={(e) => setYear(e.target.value)}/>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="email" placeholder="Please enter Course Instructor's Email." value={instructor} onChange={(e) => setInstructor(e.target.value)}/>
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
};

export default AddCourseForm;
