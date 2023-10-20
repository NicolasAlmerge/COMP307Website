import { useContext, useState, useEffect } from "react";
import { Course } from "../../classes/Course";
import { User } from "../../classes/User";
import "../../style/userTable.css";
import { UserContext } from "../../Provider";
import { Button, Form, Row, Table } from "react-bootstrap";
import { DEFAULT_TERM, DEFAULT_YEAR } from "../../Constants";
import CourseInput from "../shared/CourseInput";
import SemesterInput from "../shared/SemesterInput";
import YearInput from "../shared/YearInput";
import SearchClassesButton from "../shared/SearchClassesButton";
import { CourseTAs } from "../../classes/CourseTAs";
import React from "react";

const ManageTA = () => {
  // Context user
  const {user} = useContext(UserContext);

  // Keep track of input values
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [courseYear, setCourseYear] = useState(DEFAULT_YEAR.toString());
  const [term, setTerm] = useState<string>(DEFAULT_TERM);
  const [courseTableDisabled, setCourseTableDisabled] = useState(true);
  const [chosenCourse, setChosenCourse] = useState<number>(-1);
  const [courseTAs, setCourseTAs] = React.useState<Array<CourseTAs>>([]);

  // Every time courses or chosen courses, refresh the list of TAs
  useEffect(() => {
    //fetchTAs(courses, chosenCourse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses, chosenCourse]);

  // Fetch courses from backend
  const fetchCourses = async (e: {preventDefault: () => void}) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:3000/api/course/" + term + "/" + courseYear);
      const data = await res.json();

      // Update courses
      setCourses(data.courses);
      setCourses(state => {
        setCourseTableDisabled(false);
        setChosenCourse(state.length? 0: -1);
        return state;
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Change the course
  const handleCourseChange = (index: number) => {
    setChosenCourse(index);
  }

  return (
    <>
      <Form onSubmit={fetchCourses}>
        <Row>
          <SemesterInput term={term} setTerm={setTerm} lg={3}/>
          <YearInput courseYear={courseYear} setCourseYear={setCourseYear} lg={3}/>
          <SearchClassesButton/>
        </Row>
      </Form>

      <CourseInput
        courseTableDisabled={courseTableDisabled}
        courses={courses} lg={8} addBrake={true}
        chosenCourse={chosenCourse}
        handleCourseChange={handleCourseChange}
      />

      {
        chosenCourse === -1? <></>:
        <>
          <hr/>
          {
            !courseTAs.length? <center>There are no TAs for this course.</center>:
            <Table>

            </Table>
          }
        </>
      }
            <div>
              <table>
                <tr className="body">
                  <td className="column1">{"ID"}</td>
                  <td className="column2">{"Email"}</td>
                  <td className="column3">{"Name"}</td>
                  <td className="column5">{"Assigned Hours"}</td>
                </tr>
              </table>
            </div>
    </>
  );
};

export default ManageTA;