import React, { useState, useEffect, useContext } from "react";
import RemoveIcon from "@mui/icons-material/Delete";
import "../../style/userTable.css";
import { User } from "../../classes/User";
import { Edit } from "@mui/icons-material";
import { Modal } from "react-bootstrap";
import { Button, Form, Row, Col } from "react-bootstrap";
import { UserTypes } from "../../enums/UserTypes";
import { UserContext } from "../../Provider";

const UserRow = ({userData, fetchUserData}: {userData: User; fetchUserData: Function}) => {
  const [show, setShow] = useState(false);

  // Context user
  const {user} = useContext(UserContext);

  const [tempEmail, setTempEmail] = useState<string>(userData.email);
  const [tempFirstname, setTempFirstname] = useState<string>(userData.firstName);
  const [tempLastname, setTempLastname] = useState<string>(userData.lastName);
  const [tempPassword, setTempPassword] = useState<string>("");
  const [tempUserType, setTempUserType] = useState<Array<UserTypes>>([]);

  function handleCheckboxes(e) {
    let existingUserTypes2:UserTypes[] = [...tempUserType];
    if (e.target.checked) {
        existingUserTypes2.push(e.target.value);
    } else {
        const index = existingUserTypes2.indexOf(e.target.value);
        existingUserTypes2.splice(index, 1);
    }
    setTempUserType(existingUserTypes2);
    console.log(tempUserType);
  };

  function cancel(){
    setTempFirstname(userData.firstName);
    setTempLastname(userData.lastName);
    setTempPassword("");
  }

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:3000/api/users/deleteuser",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.email,
          }),
        });

        if (res.status === 201) {
          const data = await res.json();
          setTimeout(() => fetchUserData(), 500);
        } else {
          alert("Error while deleting user.");
        }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://127.0.0.1:3000/api/users/edituser",
        {
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
        else {
          alert("Error while editing user.");
        }
        } 
    catch (err) 
    {
      console.log(err);
    }
  };

  return (
    <tr className="body">
      <td className="column0">
      {
        (user._id === userData._id)?
        <button className="btn btn-secondary delete-btn" disabled style={{visibility: "hidden"}}>
          <RemoveIcon/>
        </button>:
        <button className="btn btn-secondary delete-btn" onClick={handleDeleteUser}>
          <RemoveIcon/>
        </button>
        }
        <button className="btn btn-secondary edit-btn" onClick={() => setShow(true)}>
          <Edit/>
        </button>
        <Modal show={show} onHide={() => {setShow(false);cancel();}} 
                dialogClassName="modal-lg" 
                aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Edit a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditUser}>
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
                                disabled 
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
              <Form.Check inline type="checkbox" label="Student" value="stud" onChange={handleCheckboxes}/>
              <Form.Check inline type="checkbox" label="Professor" value="prof" onChange={handleCheckboxes}/>
              <Form.Check inline type="checkbox" label="TA" value="ta" onChange={handleCheckboxes}/>
              <Form.Check inline type="checkbox" label="Admin" value="admin" onChange={handleCheckboxes}/>
              <Form.Check inline type="checkbox" label="Sysop" value="sysop" onChange={handleCheckboxes}/>
              </Col>
            </Row>

            <Button className="mt-3" variant="light" type="submit" onClick={() => setShow(false)}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      </td>
      <td className="column1">{userData.email}</td>
      <td className="column2">{userData.firstName}</td>
      <td className="column3">{userData.lastName}</td>
      <td className="column5">{userData.userType.join(", ")}</td>
    </tr>
  );
};

export default UserRow;
