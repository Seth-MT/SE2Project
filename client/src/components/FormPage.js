import React, { Component } from "react";
import '../App.css';


class FormPage extends Component {

    render() { 
      return (
        <div className="content">
        <div className="container-fluid">
          <div className="calendar-main-panel">
            <div className="row justify-content-md-center">
              <div className="col-md-5 my-auto">
                <div className="card register-card h-100">
                  <div className="card-header">Edit details</div>
                  <div className="card-body">
                    <form>
                      <div class="form-group">
                        <label for="dateOfBirth">Date of Birth</label>
                        <input
                          type="date"
                          class="form-control"
                          name="dateOfBirth"
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="gender">Gender</label>
                        <select class="form-control" id="gender">
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="hairType">Hair Type</label>
                        <select class="form-control" id="hairType">
                          <option>Curly</option>
                          <option>Straight</option>
                          <option>Wavy</option>
                          <option>Frizzy</option>
                        </select>
                      </div>
                      <div className="row form-group">
                          <div className="col-md-4">
                            <label for="hairLength">Estimated Hair Length</label>
                          </div>
                          <div className="col-lg-1 col-md-2">
                            <input
                              type="number"
                              class="form-control-inline hairLength"
                              name="hairLength"
                              style={{width: 45 + 'px'}}
                            ></input>
                          </div>
                          <div className="col-lg-7 col-md-6">
                            <span> inches</span>
                          </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label>Is your hair bleached?</label>
                        </div>
                        <div className="col-md-2">
                          <div>
                            <input className="form-check-input" type="radio" name="bleached" id="bleachYes" value="yes"></input>
                            <label className="form-check-label" for="bleachYes">Yes</label>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div>
                            <input className="form-check-input" type="radio" name="bleached" id="bleachNo" value="no"></input>
                            <label className="form-check-label" for="bleachNo">No</label>
                          </div>
                        </div>
                      </div>
          
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label>Select your hair colour(s)</label>
                        </div>
                        <div className="col-md-8">
                          <div className="row">
                            <div className="col-md-4">
                              <input class="form-check-input" type="checkbox" value="black" id="colBlack"></input>
                              <label class="form-check-label" for="colBlack"> Black </label>
                            </div>
                            <div className="col-md-4">
                              <input class="form-check-input" type="checkbox" value="brown" id="colBrown"></input>
                              <label class="form-check-label" for="colBrown"> Brown </label>
                            </div>
                            <div className="col-md-4">
                              <input class="form-check-input" type="checkbox" value="blonde" id="colBlonde"></input>
                              <label class="form-check-label" for="colBlonde"> Blonde </label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <input class="form-check-input" type="checkbox" value="white" id="colWhite"></input>
                              <label class="form-check-label" for="colWhite"> White </label>
                            </div>
                            <div className="col-md-4">
                              <input class="form-check-input" type="checkbox" value="blue" id="colBlue"></input>
                              <label class="form-check-label" for="colBlue"> Blue </label>
                            </div>
                            <div className="col-md-4">
                              <input class="form-check-input" type="checkbox" value="pink" id="colPink"></input>
                              <label class="form-check-label" for="colPink"> Pink </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">
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
      )
    }
}

export default FormPage