import React, { Fragment, useState } from "react";
import { Nav } from "react-bootstrap";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });

  const { userName, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

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
                      <div class="form-group">
                        <label for="userName">Username</label>
                        <input
                          type="text"
                          class="form-control"
                          name="userName"
                          placeholder="UserName"
                          value={userName}
                          onChange={(e) => onChange(e)}
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="password">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          name="password"
                          placeholder="Password"
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
