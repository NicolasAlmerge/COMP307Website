import { useContext, useState, useEffect } from "react";
import { Course } from "../../classes/Course";
import { User } from "../../classes/User";
import "../../style/rateTA.css";
import { UserContext } from "../../Provider";
import { Button, Form, Row, Table } from "react-bootstrap";
import RatingTAPopup from "./RatingTAPopup";
import { DEFAULT_TERM, DEFAULT_YEAR } from "../../Constants";
import CourseInput from "../shared/CourseInput";
import SemesterInput from "../shared/SemesterInput";
import YearInput from "../shared/YearInput";
import SearchClassesButton from "../shared/SearchClassesButton";

const RateTA = () => {
  // Context user
  const {user} = useContext(UserContext);

  // Keep track of input values
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [courseYear, setCourseYear] = useState(DEFAULT_YEAR.toString());
  const [term, setTerm] = useState<string>(DEFAULT_TERM);
  const [courseTableDisabled, setCourseTableDisabled] = useState(true);
  const [chosenCourse, setChosenCourse] = useState<number>(-1);
  const [courseTAs, setCourseTAs] = useState(new Map<User, boolean>());
  const [chosenTA, setChosenTA] = useState<User>(null);

  // Every time courses or chosen courses, refresh the list of TAs
  useEffect(() => {
    fetchTAs(courses, chosenCourse);
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
        setChosenTA(null);
        setCourseTableDisabled(false);
        setChosenCourse(state.length? 0: -1);
        return state;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTAs = async (classes: Array<Course>, courseIndex: number) => {
    // If no courses were chosen, stop
    if (courseIndex === -1) {
      setCourseTAs(new Map<User, boolean>());
      return;
    }

    const course = classes[courseIndex];
    let taUsers = new Map<User, boolean>();
    for (const ta of course.tas) {
      const taRes = await fetch("http://127.0.0.1:3000/api/users/" + ta);
      if (taRes) {
        const taData = await taRes.json();
        const rawRatingData = await fetch("http://127.0.0.1:3000/api/ratings/students/" + course._id + "/" + ta);
        const ratingData = await rawRatingData.json();
        taUsers.set(taData.user, ratingData.users.indexOf(user._id) === -1);
      }
    }

    setCourseTAs(taUsers);
  }

  // Submit the rating
  const submitRating = async (rating: number, comment: string) => {
    // Submit a request for the rating
    await fetch("http://127.0.0.1:3000/api/ratings/students/" + courses[chosenCourse]._id + "/" + chosenTA._id, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({newRating: rating, newComment: comment, requesterId: user._id})
    });

    // Reset TA and disable another rating
    courseTAs.set(chosenTA, false);
    setChosenTA(null);
  }

  // Change the course
  const handleCourseChange = (index: number) => {
    setChosenCourse(index);
    setChosenTA(null);
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
            !courseTAs.size? <center>There are no TAs for this course.</center>:
            <Table responsive>
              <thead>
                <tr>
                  <th colSpan={2} className="rate-ta-table-header">TAs for {courses[chosenCourse].courseNumber}</th>
                </tr>
              </thead>
              <tbody>
                {
                  Array.from(courseTAs.keys())
                  .sort((a, b) => a.firstName.localeCompare(b.firstName))
                  .sort((a, b) => a.lastName.localeCompare(b.lastName))
                  .map(ta =>
                    <tr key={ta._id} className="rate-ta-table-row">
                      <td className="rate-ta-table-data">{ta.firstName + " " + ta.lastName}</td>
                      <td className="rate-ta-table-data"><>
                        {
                          (!courseTAs.get(ta))? <p className="rate-ta-table-entry">Rating Submitted!</p>:
                          (chosenTA && ta._id === chosenTA._id)?
                            <RatingTAPopup
                              taName={chosenTA.firstName + " " + chosenTA.lastName}
                              unsetTa={() => setChosenTA(null)}
                              onClick={() => setChosenTA(ta)}
                              submitRating={submitRating}
                            />: <></>
                        }{
                          (courseTAs.get(ta))?
                          <Button className="rate-ta-table-entry" variant="secondary" onClick={() => setChosenTA(ta)}>Rate</Button>:
                          <></>
                        }
                      </></td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
          }
        </>
      }
    </>
  );
};

export default RateTA;
