import { useEffect, useState } from "react";
import { Modal, Form, Row, Button } from "react-bootstrap";
import { Course } from "../../classes/Course";
import { DEFAULT_TERM, DEFAULT_YEAR } from "../../Constants";
import CourseInput from "../shared/CourseInput";
import SemesterInput from "../shared/SemesterInput";
import YearInput from "../shared/YearInput";
import Dashboard from "./Dashboard";

const SelectCoursePopUp = ({onExit}: {onExit: () => void}) => {
    const [show, setShow] = useState(true);
    const [courseYear, setCourseYear] = useState(DEFAULT_YEAR.toString());
    const [term, setTerm] = useState<string>(DEFAULT_TERM);
    const [courses, setCourses] = useState<Array<Course>>([]);
    const [chosenCourse, setChosenCourse] = useState<number>(-1);
    const [finished, setFinished] = useState(false);

    // Fetch courses from backend
    const fetchCourses = async () => {
        try {
            const res = await fetch("http://127.0.0.1:3000/api/course/" + term + "/" + courseYear);
            const data = await res.json();

            // Update courses
            setCourses(data.courses);
            setCourses(state => {
                setChosenCourse(state.length? 0: -1);
                return state;
            });
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch courses every time the user switches term or year
    useEffect(() => {
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term, courseYear]);

    const handleSubmitCourseNumber = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShow(false);
        // Once finished
        setShow(state => {setFinished(true); return state;});
    };

    return (
        (finished)? <Dashboard course={courses[chosenCourse]}/>:
        <Modal
            show={show} onHide={() => {setShow(false); onExit();}}
            dialogClassName="modal-lg" centered
        >
        <Modal.Header closeButton>
            <Modal.Title>Select Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmitCourseNumber}>
                <Row>
                    <SemesterInput term={term} setTerm={setTerm} lg/>
                    <YearInput courseYear={courseYear} setCourseYear={setCourseYear} lg/>
                </Row>

                <CourseInput
                    courseTableDisabled={false}
                    courses={courses} lg addBrake={false}
                    chosenCourse={chosenCourse}
                    handleCourseChange={setChosenCourse}
                />

                <Modal.Footer>
                    <Button disabled={!courses.length} type="submit">Select Course</Button>
                </Modal.Footer>
            </Form>
        </Modal.Body>
    </Modal>
    );
}

export default SelectCoursePopUp;
