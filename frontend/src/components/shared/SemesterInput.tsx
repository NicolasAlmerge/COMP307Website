import { Col, Form, InputGroup } from "react-bootstrap";
import { terms } from "../../enums/Term";

const SemesterInput = ({term, setTerm, lg}: {term: string, setTerm: (t: string) => void, lg: any}) => {
    return (
      <Col lg={lg}>
        <InputGroup>
          <InputGroup.Text>Semester</InputGroup.Text>
          <Form.Select name="term" value={term} onChange={e => setTerm(e.target.value)}>
            {terms.map(term =>
              <option key={term} value={term}>{term.charAt(0).toUpperCase() + term.substring(1)}</option>
            )}
          </Form.Select>
        </InputGroup>
      </Col>
    );
}

export default SemesterInput;
