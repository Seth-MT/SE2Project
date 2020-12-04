import ApiCalendar from 'react-google-calendar-api';
import React, { Component } from "react";
import { toast } from "react-toastify";

class GoogleCalendarButton extends Component {

    constructor(props) {
        super();
        //Bind methods make it so that the functions are made public and other functions can use and access them
        this.handleItemClick = this.handleItemClick.bind(this);
        this.state = {
            sign: ApiCalendar.sign, //Boolean value that is set to true if user is signed in to Google Calendar and false if not
        };
        this.signUpdate = this.signUpdate.bind(this);
        ApiCalendar.onLoad(() => { //Function is called when the API is loaded
            ApiCalendar.listenSign(this.signUpdate); //Checks if user is signed in to Google Calendar
            if (ApiCalendar.sign) { //Set visibility of log in/log out buttons depending on if the user is signed in or not
              if (document.getElementById("calendar-login")) { //If the component has been rendered already
                document.getElementById("calendar-login").style.display = "none";
                document.getElementById("calendar-logout").style.display = "block";
              }
            }
            else
            {
              if (document.getElementById("calendar-login")) {
                document.getElementById("calendar-login").style.display = "block";
                document.getElementById("calendar-logout").style.display = "none";
              }
            }
          }); 
    }

    handleItemClick(event, name) { //Function that calls when the user clicks to sign in/out of Google Calendar
        if (name === 'sign-in') {
          ApiCalendar.handleAuthClick(); //Call function to bring up Google sign in menu
        } else if (name === 'sign-out') {
          ApiCalendar.handleSignoutClick(); //Call function to sign out of Google Calendar
        }
    }

    signUpdate(sign) {
        this.setState({ //Sets sign state to true if user is signed in and false if not
            sign,
          })
        if (sign) { //Set visibility of log in/log out buttons when the user logs in or out
          document.getElementById("calendar-login").style.display = "none";
          document.getElementById("calendar-logout").style.display = "block";
          toast.success("Logged in to Google Calendar", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        else
        {
          document.getElementById("calendar-login").style.display = "block";
          document.getElementById("calendar-logout").style.display = "none";
          toast.error("Logged out of Google Calendar", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
    }

    componentDidMount () {
      if (ApiCalendar.sign) {
        document.getElementById("calendar-login").style.display = "none";
        document.getElementById("calendar-logout").style.display = "block";
      }
      else {
        document.getElementById("calendar-login").style.display = "block";
        document.getElementById("calendar-logout").style.display = "none";
      }
    } 

    render() {
        return(
            <div className="google-buttons-profile">
                <button type="button" id="calendar-login" className="btn btn-primary" style={{display: "none"}} onClick={(e) => this.handleItemClick(e, 'sign-in')}>
                    Log in to Google Calendar
                </button>
                <button type="button" id="calendar-logout" className="btn btn-danger" style={{display: "none"}} onClick={(e) => this.handleItemClick(e, 'sign-out')}>
                    Log Out of Google Calendar
                </button>
          </div>
        )
    }
}

export default GoogleCalendarButton;