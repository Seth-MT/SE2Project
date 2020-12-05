/* REQUIREMENTS TRACEABILITY:

This page fulfills the following requirements:
  USER REQUIREMENTS:
  3. The user shall be able to log in or sign up to the app  

  FUNCTIONAL SYSTEM REQUIREMENTS:
  3.1 The system would allow the user to select the login button which would then prompt the user to enter their login information or new information to sign up and create a new user profile
*/

import React, { Fragment, useState } from "react";
import { Nav } from "react-bootstrap";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  //The variables and function used to set the values entered by the user for username and password
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });

  //Destructure inputs for easy access
  const { userName, password } = inputs;

  //When the values entered by the user changes set those values to the inputs state variable
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  //On submit send the username password to the backend for verification
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { userName, password };

      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await res.json();

      //If a token was received from the backend server set the token to localStorage and authorize the user
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        setAuth(true);
        toast.success("login successful");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="content">
        <div className="container-fluid">
          <div className="calendar-main-panel">
            <div className="row justify-content-md-center">
              <div className="col-md-5 my-auto">
                <div className="card register-card h-100">
                  <div className="card-header">Log In</div>
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          name="userName"
                          placeholder="UserName"
                          required
                          value={userName}
                          onChange={(e) => onChange(e)}
                        ></input>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Password"
                          autoComplete="on"
                          required
                          value={password}
                          onChange={(e) => onChange(e)}
                        ></input>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                  <div className="card-footer">
                    <Nav.Link href="register">
                      Need an account? Sign up here!
                    </Nav.Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
