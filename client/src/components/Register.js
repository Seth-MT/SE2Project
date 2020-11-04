import React, { Component } from "react";

class Register extends Component {
  render() {
    return  (
    <div className="content">
      <div className="container-fluid">
        <div className="calendar-main-panel">
           <div className="row justify-content-md-center">
              <div className="col-md-5 my-auto">
                <div className="card register-card h-100">
                  <div className="card-header">
                    Register your account
                  </div>
                  <div className="card-body">
                    <form>
                        <div class="form-group">
                          <label for="email-input">Email address</label>
                          <input type="email" class="form-control" id="email-input" aria-describedby="emailHelp" placeholder="Email address"></input>
                        </div>
                        <div class="form-group">
                          <label for="password-input">Password</label>
                          <input type="password" class="form-control" id="password-input" placeholder="Password"></input>
                        </div>
                        <div class="form-group">
                          <label for="password-confirm">Confirm Password</label>
                          <input type="password" class="form-control" id="password-confirm" placeholder="Confirm Password"></input>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </form>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Register;
