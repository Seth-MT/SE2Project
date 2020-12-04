import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApiCalendar from 'react-google-calendar-api';
import scheduleData from '../schedule.json';
import GoogleCalendarButton from './GoogleCalendarButton';

const Profile = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [profileImage, setImage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [hairType, setHairType] = useState("");
  const [hairLength, setHairLength] = useState("");
  const [bleach, setBleach] = useState("");
  const [coloring, setColoring] = useState("");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputStatus, setStatus] = useState("");

  //Get username and profile image
  useEffect(() => {
    async function getProfile() {
      try {
        const res = await fetch("/profile/", {
          method: "POST",
          headers: { token: localStorage.token },
        });

        const parseData = await res.json();
        setName(parseData.userName);
        setImage(parseData.profileImage);
      } catch (err) {
        console.error(err.message);
      }
    }

    getProfile();
  }, []);

  //Logout user
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successful");
    } catch (err) {
      console.error(err.message);
    }
  };

  //Send uploaded image to Cloudinary
  const fileSelectedHandler = async (e) => {
    const files = e.target.files;
    const fd = new FormData();

    fd.append("file", files[0]);

    //Cloudinary upload preset
    fd.append("upload_preset", "se2project");

    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtqlgbedo/image/upload",
      {
        method: "POST",
        body: fd,
      }
    );

    const file = await res.json();

    //Change profile image to file uploaded
    setImage(file.secure_url);
    setLoading(false);
  };

  //Send updated profile name and profile picture to backend server
  const fileUploadHandler = async (e) => {
    e.preventDefault();
    try {
      const body = {
        profileImage,
        newName,
        dateOfBirth,
        sex,
        hairType,
        hairLength,
        bleach,
        coloring,
      };

      const res = await fetch("/profile/update", {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const uploadStatus = await res.json();
      toast.success(uploadStatus, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (ApiCalendar.sign) {
        toast.info("Loading scheduler, please wait...", {
          position: "top-right",
          autoClose: 40000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await deleteEvent();
        await loadJson();
        toast.dismiss();
        toast.success("Your schedule has been added to your calendar!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        toast.error("Please log into Google Calendar and then save your changes again to generate your schedule.", {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    }
  };

  //When newName state is updated then post to backend server to check if name is available
  useEffect(() => {
    const inputSubmitter = async () => {
      try {
        if (newName) {
          const body = { newName };
          const status = await fetch("/profile/userExists", {
            method: "POST",
            headers: {
              token: localStorage.token,
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          });

          const parseMessage = await status.json();
          console.log(parseMessage);
          setStatus(parseMessage);
        }
      } catch (err) {
        console.error(err);
      }
    };
    inputSubmitter();
  }, [newName]);

  //Set newName state to the value entered by user
  const inputNameHandler = async (e) => {
    try {
      setNewName(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Set dateOfBirth state to the value entered by user
  const inputDOBHandler = async (e) => {
    try {
      setDateOfBirth(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Set sex state to the value entered by user
  const inputSexHandler = async (e) => {
    try {
      setSex(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Set hair type state to the value entered by user
  const inputHairTypeHandler = async (e) => {
    try {
      setHairType(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Set hair length state to the value entered by user
  const inputHairLengthHandler = async (e) => {
    try {
      setHairLength(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Set bleach state to the value entered by user
  const inputBleachHandler = async (e) => {
    try {
      setBleach(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Set color state to the value entered by user
  const inputColorHandler = async (e) => {
    try {
      setColoring(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  async function loadJson() { //Function to load data from a json file
    var today = new Date(); //Create Date object of the current day
    var date; //Store value of the today var
    var scheduleDay; //Value of the day of the schedule event
    var scheduleWeek; //Value of which week of the month that the event should be placed on
    var scheduleMonth; //Value of the month of the schedule event
    var scheduleYear; //Value of the year of the schedule event
    var counter=0; //Counter to determine how many times the json has been looped through
    for (var k=0; k<2; k++) { //Create events for the schedule in the user's Google Calendar for the next two months
      for (var j=0; j<(scheduleData.length); j++) { //Schedules are made for four weeks and are then repeated. scheduleData is the json file and the length is multiplied by 2 to ensure that the possible 5th week in a month is properly filled 
        if (j >= scheduleData.length) { //If the json file has been looped through once
          var i = j%scheduleData.length;
          counter = 1;
        }
        else {
          i = j;
          counter = 0;
        }
        if (scheduleData[i]) { //If data exists
          date = today; //Store value of today var
          today = new Date(); //Create new today var
          date.setMonth(today.getMonth()+k); //Set month of date to the current month plus the current iteration of the loop so that the month after can be filled out
          scheduleMonth = date.getMonth() + 1; //Set scheduleMonth to the month of the date var plus 1 because Date object's months are 0-indexed
          scheduleYear = date.getFullYear(); //Set scheduleYear to the year of the year of the date var
          var week = daysOfTheWeek(date); //Get the scheduleDay of the date
          scheduleWeek = scheduleData[i].week - 1 //Get the week that the event is supposed to be placed on
          if (counter === 1) { //If the json has been looped through once already, the fifth week must now be filled out
            scheduleWeek = 4;
          }
          if (week[scheduleData[i].day][scheduleWeek]) { //If the value in week array exists
            scheduleDay = week[scheduleData[i].day][scheduleWeek];
            var event = {
              summary: "Hair Thing - " + scheduleData[i].event, //Events created by the app must begin witth "Hair Thing - "
              start: { //Create start date in the format for Google Calendar API to read
                dateTime: scheduleYear + "-" + scheduleMonth + "-" + scheduleDay + "T" + scheduleData[i].start + "-04:00"
              },
              end: { //Create end date in the format for Google Calendar API to read
                dateTime: scheduleYear + "-" + scheduleMonth + "-"  + scheduleDay + "T" + scheduleData[i].end + "-04:00"
              },
              description: scheduleData[i].description
            };
            await createEvent(event); //Create and add the event to the user's Google Calendar
          }
        }
      }
    }
  }

  function daysOfTheWeek(date) { //Function to determine the date that the schedule item would land on depending on that weekday written on the schedule json
    var daysInMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); //Get the amount of days in the selected month
    var week = [[],[],[],[],[],[],[]]; //Array that stores the days for each day of the week where each array is a new day (Sunday, Monday, Tuesday, etc)
    for(var j=1;j<=daysInMonth;j++) {  //looping through days in month
      var newDate = new Date(date.getFullYear(),date.getMonth(), j)
      if (!week[newDate.getDay()]) { //Initialise multidimensional array
        week[newDate.getDay()] = []
        }
      week[newDate.getDay()].push(j); //Push the day into the associated index of the week array
    }
    return week;
  }

  async function createEvent(event) { //Function used to create a new event in the user's Google Calendar
    if (ApiCalendar.sign) { //Only executes if the user is signed in to Google Calendar
      let keepTrying; //Bool value that indicates whether to keep trying to make the API call or not
      do { //while keepTrying is true
        try {
          const response = await ApiCalendar.createEvent(event); //Create event
          var result = response.result;
          console.log(result);
          keepTrying = false; //Set keepTrying to false to end the loop
        }
        catch {
          keepTrying = true; //keepTrying remains as true so it loops again
        }
      } while (keepTrying);
    }
  }

  async function deleteEvent() { //Function to delete all Hair Thing events from the user's Google Calendar
    if (ApiCalendar.sign) { //Only executes if the user is signed in to Google Calendar
      console.log('Signed in');
      const response = await ApiCalendar.listUpcomingEvents(100); //Retrieve the next 100 events
      var result = response.result;
        for (var i=0; i<result.items.length; i++) { //Loops through the list of upcoming events
          if (result.items[i].summary.substring(0, 10) === "Hair Thing") { //If the event is a Hair Thing event
            try {
              const tryDelete = await ApiCalendar.deleteEvent(result.items[i].id); //Delete the event from the user's Google Calendar
              console.log(tryDelete.result); //Something must be done withs tryDelete.result or ele the event wont be deleted
            }
            catch(error) {
              console.log(error);
            }
          }
        }
      }
    else {
      console.log("Not signed in");
    }
  }

  return (
    <div className="container-fluid">
      <h1 className="mt-5 text-center">Profile</h1>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md2 text-center">
            {loading ? (
              <h5>Loading...</h5>
            ) : (
              <img
                id="image"
                src={profileImage}
                width="171"
                height="180"
                alt="loading img"
              />
            )}
          </div>
          <div className="col">
            <h2 className="text-left">Welcome, {name}</h2>
          </div>
        </div>
        <form onSubmit={(e) => fileUploadHandler(e)}>
          <div className="form-group">
            <input
              name="file"
              type="file"
              onChange={(e) => fileSelectedHandler(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder={name}
              defaultValue={name}
              onChange={(e) => inputNameHandler(e)}
            />
            {
              //Check if username available
              inputStatus === "User already exists" ? (
                <div style={{ color: "red" }}> {inputStatus} </div>
              ) : inputStatus === "No change" ? (
                <div></div>
              ) : inputStatus === "Name available!" ? (
                <div style={{ color: "green" }}> {inputStatus} </div>
              ) : (
                <div></div>
              )
            }
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dateOfBirth"
              onChange={(e) => inputDOBHandler(e)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="sex">Sex</label>
            <select
              className="form-control"
              id="sex"
              onChange={(e) => inputSexHandler(e)}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="hairType">Hair Type</label>
            <select
              className="form-control"
              id="hairType"
              onChange={(e) => inputHairTypeHandler(e)}
            >
              <option>Straight</option>
              <option>Wavy</option>
              <option>Curly</option>
              <option>Coily</option>
            </select>
          </div>
          <div className="row form-group">
            <div className="col-md-4">
              <label htmlFor="hairLength">Estimated Hair Length</label>
            </div>
            <div className="col-lg-1 col-md-2">
              <input
                type="number"
                className="form-control-inline hairLength"
                name="hairLength"
                onChange={(e) => inputHairLengthHandler(e)}
                style={{ width: 45 + "px" }}
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
                <input
                  className="form-check-input"
                  type="radio"
                  name="bleached"
                  id="bleachYes"
                  value="true"
                  onChange={(e) => inputBleachHandler(e)}
                ></input>
                <label className="form-check-label" htmlFor="bleachYes">
                  Yes
                </label>
              </div>
            </div>
            <div className="col-md-2">
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="bleached"
                  id="bleachNo"
                  value="false"
                  onChange={(e) => inputBleachHandler(e)}
                ></input>
                <label className="form-check-label" htmlFor="bleachNo">
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-4">
              <label>History of coloring</label>
            </div>
            <div className="col-md-2">
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="colored"
                  id="colorYes"
                  value="true"
                  onChange={(e) => inputColorHandler(e)}
                ></input>
                <label className="form-check-label" htmlFor="colorYes">
                  Yes
                </label>
              </div>
            </div>
            <div className="col-md-2">
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="colored"
                  id="colorNo"
                  value="false"
                  onChange={(e) => inputColorHandler(e)}
                ></input>
                <label className="form-check-label" htmlFor="colorNo">
                  No
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Save Changes
          </button>
          <br></br><br></br>
          <GoogleCalendarButton></GoogleCalendarButton>
        </form>
      </div>

      <div className="row">
        <div className="col mt-5 text-center">
          <button onClick={(e) => logout(e)} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
