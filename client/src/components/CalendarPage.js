import React, { Component } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import ApiCalendar from 'react-google-calendar-api';
import { toast } from "react-toastify";



class CalendarPage extends Component {

  constructor(props) {
    super();
    //Bind methods make it so that the functions are made public and other functions can use and access them
    this.handleItemClick = this.handleItemClick.bind(this);
    this.state = {
      sign: ApiCalendar.sign, //Boolean value that is set to true if user is signed in to Google Calendar and false if not
      value: new Date(), //Date of the calendar tile that the user clicked
      loading: true,
      newEvent: 0,
      loggedIn: false
    };
    this.signUpdate = this.signUpdate.bind(this);
    ApiCalendar.onLoad(() => { //Function is called when the API is loaded
        ApiCalendar.listenSign(this.signUpdate); //Checks if user is signed in to Google Calendar
        if (ApiCalendar.sign) { //Set visibility of log in/log out buttons depending on if the user is signed in or not
          document.getElementById("calendar-login").style.display = "none";
          document.getElementById("calendar-logout").style.display = "block";
          this.getEventDays();
        }
        else
        {
          document.getElementById("calendar-login").style.display = "block";
          document.getElementById("calendar-logout").style.display = "none";
        }
    });
  }

  events = [[],[],[]]; //Array used to store all events that are retrieved from the user's Google Calendar

  signUpdate(sign) {
    this.setState({ //Sets sign state to true if user is signed in and false if not
      sign,
    })
    if (sign) { //Set visibility of log in/log out buttons when the user logs in or out
      document.getElementById("calendar-login").style.display = "none";
      document.getElementById("calendar-logout").style.display = "block";
    }
    else
    {
      document.getElementById("calendar-login").style.display = "block";
      document.getElementById("calendar-logout").style.display = "none";
    }
    window.location.reload(); //Refresh the page
  }

  handleItemClick(event, name) { //Function that calls when the user clicks to sign in/out of Google Calendar
    if (name === 'sign-in') {
      ApiCalendar.handleAuthClick(); //Call function to bring up Google sign in menu
    } else if (name === 'sign-out') {
      ApiCalendar.handleSignoutClick(); //Call function to sign out of Google Calendar
      document.getElementById("schedule-list").innerHTML = ""; //Clear the schedule card
    }
  }

  convertHour(hour) { //Function that converts 24hr time to 12hr time
    var time = {}; //Array that stores hour value in 0 index and AM or PM in the 1 index
    if (hour > 12) {
      time[0] = hour-12;
      time[1] = "PM";
    }
    else {
      time[0] = hour;
      time[1] = "AM";
    }
    return time;
  }

  convertMinute(minute) { //Function that converts the minute value to a more readable value when the minute is at the start of the hour
    var time;             //This is needed or else a time such as "5:00" will appear as "5:0"
    if (minute === 0) {
      time = "00";
    }
    else {
      time = minute;
    }
    return time;
  }

  changeSelectedDate = date => { //Function that calls when the user clicks on a tile on the calendar
    var month = date.getMonth();
    var year = date.getFullYear();
    var day = date.getDate();
    this.getEventDays();
    if (ApiCalendar.sign) { //Only executes if the user is signed in to Google Calendar
      console.log('Signed in');
      ApiCalendar.listUpcomingEvents(100) //Lists the next 100 upcoming events
        .then(({result}) => {
          console.log(result.items);
          var scheduleCard = document.getElementById("schedule-list");
          var i=0;  
          scheduleCard.innerHTML = ""; //Reset the card to be empty
          for (i=0; i<result.items.length; i++) { //Loops through the list of upcoming events
            var scheduleDate = (new Date(Date.parse(result.items[i].start.dateTime))); //Convert dateTime object to Date object
            if (day === scheduleDate.getDate() && month === scheduleDate.getMonth() && year === scheduleDate.getFullYear() && result.items[i].summary.substring(0, 10) === "Hair Thing") { //If the event is on the same day as the day the user clicked and begins with "Hair Thing"
              var node = document.createElement("LI"); //Create list element
              node.className += " list-group-item"; //Adds bootstrap CSS for list group
              node.className += " schedule-item"; //Adds CSS for list items
              var hour = this.convertHour(scheduleDate.getHours()); //Format hour from 24hr time to 12hr time
              var minute = this.convertMinute(scheduleDate.getMinutes()); //See convertMinute code comments
              var title = result.items[i].summary.substring(13); //Ignore the first 13 characters of the event name (this would be the part of the event that says "Hair Thing - ")
              var textnode = document.createTextNode(title + " - " + hour[0] + ":" + minute + " " + hour[1]); //Create text that would show the event title and start time
              node.appendChild(textnode); //Add text to node
              textnode = document.createTextNode(result.items[i].description); //Create text node for the event description
              var breaknode = document.createElement("BR"); //Create break element
              node.appendChild(breaknode);
              node.appendChild(textnode);
              scheduleCard.appendChild(node); //Add node to the schedule card
            }
          }
        });
      }
      else {
        console.log('Not signed in');
      }
  };

  async getEventDays () { //Function used to retrieve the events on the user's Google Calendar
    var j=0;
    if (ApiCalendar.sign) { //If the user is signed into Google Calendar
      const response = await ApiCalendar.listUpcomingEvents(100); //Retrieve the next 100 events
      var result = response.result; //Result of the API call
      for (var i=0; i<result.items.length; i++) { //Loops through the list of upcoming events
        var eventDate = (new Date(Date.parse(result.items[i].start.dateTime))); //Convert dateTime object to Date object
        if (result.items[i].summary.substring(0, 10) === "Hair Thing") { //If the event begins with "Hair Thing"
          if (!this.events[j]) { //Initialise array, this is necessary for multidimensional arrays in JavaScript
            this.events[j] = []
          }
          this.events[j][0] = eventDate.getDate(); //Store day value
          this.events[j][1] = eventDate.getMonth(); //Store month value
          this.events[j][2] = eventDate.getFullYear(); //Store year value
          j++; 
        }
      }
      this.setState ({ //Let the app know that the API is finished loading and is now allowed to render the component
        loading: false,
      });
    }
    else {
      console.log("Not signed in");
    }
  }

  allEvents(events, date) { //Function to mark days where an event is on
    for (var i=0; i<this.events.length; i++) {
      if(date.getDate() === this.events[i][0] && date.getMonth() === this.events[i][1] && date.getFullYear() === this.events[i][2]) //If the calendar tile is a day that an event is on
        return true;
    }
    return false;
  }

  onChange = value => this.setState({ value }) //Sets value state to the date that the user clicked on the calendar

    render() { 
        const { value } = this.state.value;
        var tileClassName=({ date, view }) => {
          if(this.allEvents(this.events, date)) {
            return 'highlight'
          }
        }
        return (
          <div className="content">
            <div className="container-fluid">
              <div className="calendar-main-panel">
                <div className="row">
                  <div className="col-md-5">
                    <div className="calendar">
                      <Calendar
                        tileClassName = {tileClassName}
                        value={value}
                        onChange={this.changeSelectedDate} >
                      </Calendar>
                    </div>
                  </div>
                  <div className="col-md-7">
                      <div id="calendar-card" className="card calendar-card h-100">
                        <ul id="schedule-list" className="list-group">
                        </ul>
                      </div>
                  </div>
                </div>
                <div className="google-calendar-buttons">
                  <button type="button" id="calendar-login" className="btn btn-primary" style={{display: "none"}} onClick={(e) => this.handleItemClick(e, 'sign-in')}>Log in to Google Calendar</button>
                  <button type="button" id="calendar-logout" className="btn btn-danger" style={{display: "none"}} onClick={(e) => this.handleItemClick(e, 'sign-out')}>Log Out of Google Calendar</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default CalendarPage;