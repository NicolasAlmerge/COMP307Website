import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { Course } from "../../classes/Course";


const CourseInput = (
    {courseTableDisabled, courses, chosenCourse, handleCourseChange, lg, addBrake}:
    {
        courseTableDisabled: boolean, courses: Array<Course>, chosenCourse: number,
        handleCourseChange: (x: number) => void, lg: any, addBrake: boolean
    },
) => {

    const changeCourse = (index: number) => {
        if (Number.isNaN(index) || index < 0 || index >= courses.length) return;
        handleCourseChange(index);
    };

    return (
        courseTableDisabled? <></>:
        !courses.length?
            <>
                {addBrake? <><br/><center>No courses found for this term and year.</center></>:
                <Row>
                    <Col lg><Form.Control disabled value="No courses found for this term and year."/></Col>
                </Row>
                }
            </>:
        <>
            {addBrake? <br/>: <></>}
            <Row>
                <Col lg={lg}>
                    <InputGroup>
                        <InputGroup.Text>Course</InputGroup.Text>
                        {
                        courses.length === 1? <Form.Control value={courses[0].courseNumber + " - " + courses[0].courseName} disabled/>:
                        <Form.Select value={chosenCourse} onChange={e => changeCourse(+e.target.value)}>
                            {courses.map((course, i) =>
                            <option key={i} value={i}>{course.courseNumber} - {course.courseName}</option>
                            )}
                        </Form.Select>
                        }
                    </InputGroup>
                </Col>
            </Row>
        </>
    );
}

export default CourseInput;
