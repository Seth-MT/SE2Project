import React, { Component } from "react";
import '../App.css';

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOfBirth: "",
      sex: "",
      hairType: "",
      hairLength: "",
      bleach: false,
      color: false,
    };
  }

  handleChangeInputdDOB = async event => {
    const dateOfBirth = event.target.value
    this.setState({ dateOfBirth })
  }

  handleChangeInputSex = async event => {
    const sex = event.target.value
    this.setState({ sex })
  }

  handleChangeInputHairType = async event => {
    const hairType = event.target.value
    this.setState({ hairType })
  }

  handleChangeInputHairLength = async event => {
    const hairLength = event.target.value
    this.setState({ hairLength })
  }

  handleChangeInputBleach = async event => {
    const bleach = event.target.value
    this.setState({ bleach })
  }

  handleChangeInputColor = async event => {
    const color = event.target.value
    this.setState({ color })
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log(this.state.hairType);
    this.setState({
      dateOfBirth: "",
      sex: "",
      hairType: "",
      hairLength: "",
      bleach: "",
      color: "",
    });
  }

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
                    <form onSubmit = {this.handleSubmit}>
                      <div class="form-group">
                        <label for="dateOfBirth">Date of Birth</label>
                        <input
                          type="date"
                          class="form-control"
                          name="dateOfBirth"
                          onChange = {this.handleChangeInputdDOB}
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="sex">Sex</label>
                        <select class="form-control" id="sex" onChange = {this.handleChangeInputSex}>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="hairType">Hair Type</label>
                        <select class="form-control" id="hairType" onChange = {this.handleChangeInputHairType}>
                          <option>Straight</option>
                          <option>Wavy</option>
                          <option>Curly</option>
                          <option>Coily</option>
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
                              onChange = {this.handleChangeInputHairLength}
                              style={{width: 45 + 'px'}}
                            ></input>
                          </div>
                          <div className="col-lg-7 col-md-6">
                            <span> inches</span>
                          </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label>History of bleaching</label>
                        </div>
                        <div className="col-md-2">
                          <div>
                            <input className="form-check-input" type="radio" name="bleached" id="bleachYes" value="true" onChange = {this.handleChangeInputBleach}></input>
                            <label className="form-check-label" for="bleachYes">Yes</label>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div>
                            <input className="form-check-input" type="radio" name="bleached" id="bleachNo" value="false" onChange = {this.handleChangeInputBleach}></input>
                            <label className="form-check-label" for="bleachNo">No</label>
                          </div>
                        </div>
                      </div>
          
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label>History of coloring</label>
                        </div>
                        <div className="col-md-2">
                          <div>
                            <input className="form-check-input" type="radio" name="colored" id="colorYes" value="true" onChange = {this.handleChangeInputColor}></input>
                            <label className="form-check-label" for="colorYes">Yes</label>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div>
                            <input className="form-check-input" type="radio" name="colored" id="colorNo" value="false" onChange = {this.handleChangeInputColor}></input>
                            <label className="form-check-label" for="colorNo">No</label>
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