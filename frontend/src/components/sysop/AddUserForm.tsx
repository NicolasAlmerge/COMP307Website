import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "react-bootstrap";
import "../../style/userTable.css";
import { UserTypes } from "../../enums/UserTypes";

function AddUserForm({ fetchUserData }) {
  const [show, setShow] = useState(false);
  const [tempEmail, setTempEmail] = useState<string>("");
  const [tempFirstname, setTempFirstname] = useState<string>("");
  const [tempLastname, setTempLastname] = useState<string>("");
  const [tempPassword, setTempPassword] = useState<string>("");
  const [tempUserType, setTempUserType] = useState<Array<UserTypes>>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // CAUTION: Do not hard code the URLs, rather use routers
      const res = await fetch("http://127.0.0.1:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: tempEmail,
          firstName: tempFirstname,
          lastName: tempLastname,
          password: tempPassword,
          userType: tempUserType,
        }),
      });

      if (res.status === 201) {
        const data = await res.json();
        setTimeout(() => {
          fetchUserData();
        }, 500);
      } 
      else if(res.status === 409){
        alert("User with that email already exists.");
      }
      else {
        alert("Error while adding user.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleCheckbox(e) {
    let existingUserTypes:UserTypes[] = [...tempUserType];
    if (e.target.checked) {
        existingUserTypes.push(e.target.value);
    } else {
        const index = existingUserTypes.indexOf(e.target.value);
        existingUserTypes.splice(index, 1);
    }
    setTempUserType(existingUserTypes);
    console.log(tempUserType);
  }

  return (
    <div>
      <button className="mb-4 mt-2" onClick={() => setShow(true)}>
        <AddIcon />
      </button>

      <Modal show={show} onHide={() => setShow(false)} 
                dialogClassName="modal-lg" 
                aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Add a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Control required type="firstName" 
                                placeholder="Enter the first name of the user" 
                                value={tempFirstname} 
                                onChange={(e) => setTempFirstname(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="lastName" 
                                placeholder="Enter the last name of the user" 
                                value={tempLastname} 
                                onChange={(e) => setTempLastname(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="email" 
                                placeholder="abc@xyz.com" 
                                value={tempEmail} 
                                onChange={(e) => setTempEmail(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="password" 
                                placeholder="Enter temporary password" 
                                value={tempPassword} 
                                onChange={(e) => setTempPassword(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
              <Form.Check inline type="checkbox" label="Student" value="stud" onChange={handleCheckbox}/>
              <Form.Check inline type="checkbox" label="Professor" value="prof" onChange={handleCheckbox}/>
              <Form.Check inline type="checkbox" label="TA" value="ta" onChange={handleCheckbox}/>
              <Form.Check inline type="checkbox" label="Admin" value="admin" onChange={handleCheckbox}/>
              <Form.Check inline type="checkbox" label="Sysop" value="sysop" onChange={handleCheckbox}/>
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

export default AddUserForm;
