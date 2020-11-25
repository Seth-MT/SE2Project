import { Formik } from "formik";
import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import { values } from "sequelize/types/lib/operators";
import '../App.css';

const FormPage = ({ setAuth }) => (
  <Formik
    initialValues = {{
      dateOfBirth: "",
      sex: "",
      hairType: "",
      hairLength: "",
      bleach: false,
      coloring: false,
    }}

    onSubmit = {async (values, { setSubmitting }) => {
      try {
        const res = await fetch("/profile/edit", {
          method: "PUT",
          headers: {
            headers: {
              token: localStorage.token,
              "Content-type": "application/json"
            },
            body: JSON.stringify(values)
          }
        });
        toast.success("Updated!");
      }
      catch (err){
        console.error(err.message);
      }
    }}
  >
    {(props) => {
      const {
        values,
        isSubmitting,
        handleChange,
        handleSubmit,
      } = props;
    
      return (
        <Fragment>
          <div className="content">
            <div className="container-fluid">
              
                <div className="row justify-content-md-center">
                  <div className="col-md-5 my-auto">
                    <div className="card register-card h-100">
                      <div className="card-header">Edit details</div>
                      <div className="card-body">
                        <form onSubmit = {handleSubmit}>
                          <div class="form-group">
                            <label for="dateOfBirth">Date of Birth</label>
                            <input
                            type="date"
                            class="form-control"
                            name="dateOfBirth"
                            value = {values.dateOfBirth}
                            onChange = {handleChange}
                            ></input>
                          </div>
                          <div class="form-group">
                            <label for="sex">Sex</label>
                            <select class="form-control" id="sex" onChange = {handleChange}>
                              <option value = {values.sex}>Male</option>
                              <option value = {values.sex}>Female</option>
                            </select>
                          </div>
                          <div class="form-group">
                          <label for="hairType">Hair Type</label>
                            <select class="form-control" id="hairType" onChange = {handleChange}>
                              <option value = {values.hairType}>Straight</option>
                              <option value = {values.hairType}>Wavy</option>
                              <option value = {values.hairType}>Curly</option>
                              <option value = {values.hairType}>Coily</option>
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
                              value = {values.hairLength}
                              onChange = {handleChange}
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
                                <input className="form-check-input" type="radio" name="bleached" id="bleachYes" value={values.bleach} onChange = {handleChange}></input>
                                <label className="form-check-label" for="bleachYes">Yes</label>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div>
                                <input className="form-check-input" type="radio" name="bleached" id="bleachNo" value={values.bleach} onChange = {handleChange}></input>
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
                                <input className="form-check-input" type="radio" name="colored" id="colorYes" value={values.coloring} onChange = {handleChange}></input>
                                <label className="form-check-label" for="colorYes">Yes</label>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div>
                                <input className="form-check-input" type="radio" name="colored" id="colorNo" value={values.coloring} onChange = {handleChange}></input>
                               <label className="form-check-label" for="colorNo">No</label>
                              </div>
                            </div>
                          </div>
                          <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled = {isSubmitting}
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </Fragment>
      );
    }}
  </Formik>
);

export default FormPage;