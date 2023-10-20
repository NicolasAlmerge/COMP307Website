import { Col, Form, InputGroup } from "react-bootstrap";
import { YEARS } from "../../Constants";

const YearInput = ({courseYear, setCourseYear, lg}: {courseYear: string, setCourseYear: (t: string) => void, lg: any}) => {
    return (
        <Col lg={lg}>
            <InputGroup>
                <InputGroup.Text>Year</InputGroup.Text>
                    <Form.Select name="term" value={courseYear} onChange={e => setCourseYear(e.target.value)}>
                    {YEARS.map(year =>
                    <option key={year} value={year}>{year}</option>
                    )}
                </Form.Select>
            </InputGroup>
        </Col>
    );
}

export default YearInput;
