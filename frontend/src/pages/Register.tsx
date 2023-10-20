import { elementAcceptingRef } from "@mui/utils";
import React, { useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import "../App.css"
import { UserTypes } from "../enums/UserTypes";
import "../style/register.css";


const Register: React.FC = () => {
    /*hooks*/
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [StudID, setStudID] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isProf,setProf] = useState(false);
    const [courses,setCourses] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (StudID.length === 0 && isProf === false){
        alert("Where is your Student ID?")
      }
      /* Validation: Firstname filled or not?*/
      else if (firstName.length === 0){
        alert("Where is your first name?")
      }

      /* Validation: Lastname filled or not?*/
      else if (lastName.length === 0){
        alert("Where is your last name?")
      }

      /* Validation: email filled or not?*/
      else if (email.length === 0){
        alert("Enter your email!")
      }

      /* Validation: minimum length met or not?*/
      else if (password.length < 8){
        alert("Your password should be longer than 8 characters!")
      }

      /* Validation: double checked pw correct or not?*/
      else if (password !== confirmPassword) {
        alert("Repeated password doesn't match the password!");
      } 

      /* Validation passed */
      else if (isProf === true){
        /* API call to register*/
        try {
          const res = await fetch("http://127.0.0.1:3000/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            userType: UserTypes.Professor,
            }),
          });
          if (res.status === 409){
            alert("Prof with that email already exists! If u forget ur password, contact admin :)");
          }

        } catch (err) {
          console.log(err);
        }
        /*If register successfully, redirect to login page*/
        navigate("/login");  

      }
      else if (isProf === false){
        try {
          const res = await fetch("http://127.0.0.1:3000/api/students/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            userType: UserTypes.Student,
            IDNumber: StudID,
            courses: courses,
            }),
          });
          if (res.status === 404){
            alert("invalid Course");
          }

        } catch (err) {
          console.log(err);
        }
        /*If register successfully, redirect to login page*/
        navigate("/login"); 


      }
    }

    return(
        <div className="form">
            <div className="form-body">
              <h1>Sign Up</h1>
              <p>Please fill in this form to create an account.</p>
              <hr></hr>
                <div className="isProfornot">
                    <label htmlFor=""><b>Role:</b> </label>
                </div>
                <div className="button2" onClick={()=>setProf(false)}>
                  <center>Student</center>
                </div>
                <div className="button2" onClick={()=>setProf(true)}>
                  <center>Professor</center>
                </div>

                <form>
                { isProf === false &&
                <div className="StudentID">
                    <label htmlFor="StudID"><b>Student ID:</b> </label>
                    <input className="form_input" type="text" value={StudID} onChange = {(e) => setStudID(e.target.value)} id="studid" placeholder="Enter Student ID"/>
                </div>}

                <div className="Courses">
                    <label htmlFor="Courses"><b>Courses:</b> </label>
                    <input className="form_input" type="text" value={courses} onChange = {(e) => setCourses(e.target.value)} id="courses" placeholder="Enter ur Courses"/>
                </div>

                <div className="username">
                    <label htmlFor="firstName"><b>First Name:</b> </label>
                </div>
                <input className="form_input" type="text" value={firstName} onChange = {(e) => setFirstName(e.target.value)} id="firstName" placeholder="Enter First Name"/>
                
                <div className="lastname">
                    <label htmlFor="lastName"><b>Last Name:</b></label>
                </div>
                <input  type="text" name="" id="lastName" value={lastName} className="form_input" onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name"/>
                  
                <div className="email">
                    <label htmlFor="email"><b>Email:</b></label>
                </div>
                <input type="email" id="email" className="form_input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email"/>
                
                <div className="password">
                    <label htmlFor="password"><b>Password:</b></label>
                </div>
                <input className="form_input" type="password"  id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"/>
                
                <div className="confirm-password">
                    <label htmlFor="confirmPassword"><b>Confirm Password:</b></label>
                </div>
                <input className="form_input" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password"/>
        

                <center>
                  <input type="submit" className="register-user-button" value="Register" onClick={handleSubmit}/>
                </center>
              </form>
            </div>
        </div>
       
    )       
}

export default Register;
