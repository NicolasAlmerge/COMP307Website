import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/mcgill_logo.png";
import { UserContext } from "../Provider";
import "../App.css";
import "../style/login.css";

const Login: React.FC = () => {
  // Load global state
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);

  // Declare hooks
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  // On submit pass email and password values entered by user
  const submitHandler = async (e: {preventDefault: () => void}) => {
    e.preventDefault();

    // Do nothing if empty email or password
    if (!email || !password) return;

    try {
      // Make login API call
      // CAUTION: Do not hardcode the URLs, instead use routers
      const res = await fetch(
        "http://127.0.0.1:3000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      // If login was successful, set user and redirect to home page
      if (res.status === 200) {
        const result = await res.json();
        setUser(result);
        navigate("/dashboard");
        return;
      }

      // Else, there is an error
      setError("Invalid username or password.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <div className="welcome">
        <form onSubmit={submitHandler}>
          <div className="form-inner">
            <img className="logo" src={logo} alt="mcgill-logo"/>

            <p className="top">Sign in with your email and password.</p>
            {(error !== "")? <div className="error alert alert-danger">{error}</div>: ""}

            <div className="form-group">
              <input
                type="text"
                name="email"
                placeholder="Email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="sign-in-button">
              <input type="submit" value="Sign in"
              disabled={!email || !password}
              title={(email && password)? "": "Please provide a username and password."}
              className={(email && password)? "active": "inactive"}
              />
            </div>

            <p className="bottom">
              <Link className="links" to="/register">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
