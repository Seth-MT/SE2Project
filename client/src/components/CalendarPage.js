import React, { Component } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import ApiCalendar from 'react-google-calendar-api';


class CalendarPage extends Component {

  constructor(props) {
    super();
    this.handleItemClick = this.handleItemClick.bind(this);
    this.state = {
      sign: ApiCalendar.sign, //Boolean value that is set to true if user is signed in to Google Calendar and false if not
      value: new Date(), //Date of the calendar tile that the user clicked
      loading: true
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
    window.location.reload();
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
            if (day === scheduleDate.getDate() && month === scheduleDate.getMonth() && year === scheduleDate.getFullYear()) { //If the event is on the same day as the day the user clicked
              var node = document.createElement("LI"); //Create list element
              node.className += " list-group-item"; //Adds bootstrap CSS for list group
              var hour = this.convertHour(scheduleDate.getHours());
              var minute = this.convertMinute(scheduleDate.getMinutes());
              var title = result.items[i].summary;
              var textnode = document.createTextNode(title + "- " + hour[0] + ":" + minute + " " + hour[1]);
              node.appendChild(textnode);
              scheduleCard.appendChild(node);
            }
          }
        });
      }
      else {
        console.log('Not signed in');
      }
  };

  createEvent(event) {
    ApiCalendar.createEvent(event)
    .then((result) => {
      console.log(result);
        })
     .catch((error) => {
       console.log(error);
        });
  }

  async getEventDays () {
    var days = {};
    if (ApiCalendar.sign) {
      const response = await ApiCalendar.listUpcomingEvents(100);
      var result = response.result;
      for (var i=0; i<result.items.length; i++) { //Loops through the list of upcoming events
        var eventDate = (new Date(Date.parse(result.items[i].start.dateTime))); //Convert dateTime object to Date object
        days[i] = eventDate.getDate();
        this.events[i] = eventDate.getDate();
      }
      this.setState ({
        loading: false,
      });
    }
    else {
      console.log("Not signed in");
    }
    return days;
  }

  events = [];

  allEvents(events, date) {
    for (var i=0; i<this.events.length; i++) {
      if(date.getDate() === this.events[i])
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
        const event = {
          summary: "Created Event",
          start: {
            dateTime: "2020-11-09T19:30:00-04:00"
          },
          end: {
            dateTime: "2020-11-09T20:30:00-04:00"
          }
        };
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

export default CalendarPage