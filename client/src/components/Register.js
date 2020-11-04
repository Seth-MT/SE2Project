import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    confirmPass,
  } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { firstName, lastName, userName, email, password };

      //https://thehairthing.herokuapp.com/
      const res = await fetch(
        "/auth/register",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await res.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.sucess("Registered successfully");
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
                  <div className="card-header">Register your account</div>
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input
                          type="text"
                          class="form-control"
                          name="firstName"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => onChange(e)}
                          required
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input
                          type="text"
                          class="form-control"
                          name="lastName"
                          placeholder="Last Name"
                          required
                          value={lastName}
                          onChange={(e) => onChange(e)}
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="userName">Username</label>
                        <input
                          type="text"
                          class="form-control"
                          name="userName"
                          placeholder="Username"
                          required
                          value={userName}
                          onChange={(e) => onChange(e)}
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="email">Email address</label>
                        <input
                          type="email"
                          class="form-control"
                          name="email"
                          aria-describedby="emailHelp"
                          placeholder="Email address"
                          required
                          onChange={(e) => onChange(e)}
                          value={email}
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="password">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          name="password"
                          placeholder="Password"
                          required
                          value={password}
                          onChange={(e) => onChange(e)}
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="confirmPass">Confirm Password</label>
                        <input
                          type="password"
                          class="form-control"
                          name="confirmPass"
                          placeholder="Confirm Password"
                          required
                          value={confirmPass}
                          onChange={(e) => onChange(e)}
                        ></input>
                      </div>
                      <button type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    </form>
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

export default Register;
