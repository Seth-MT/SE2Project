import React, { Component } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import ApiCalendar from 'react-google-calendar-api';

class CalendarPage extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  
  handleItemClick(event, name) {
    if (name === 'sign-in') {
      ApiCalendar.handleAuthClick();
    } else if (name === 'sign-out') {
      ApiCalendar.handleSignoutClick();
    }
  }

  state = {
    value: new Date(),
  }

  changeSelectedDate = date => {
   
    var month = date.getMonth();
    var year = date.getFullYear();
    var day = date.getDate();
    console.log("Clicked " + day + " " + month + " " + year);
    if (ApiCalendar.sign) {
      ApiCalendar.listUpcomingEvents(10)
        .then(({result}) => {
          console.log('Yep', result.items.length);
          console.log(result.items);
          var scheduleCard = document.getElementById("schedule-list");
          var i=0;
          scheduleCard.innerHTML = "";
          for (i=0; i<result.items.length; i++) {
            var scheduleDate = (new Date(Date.parse(result.items[i].start.dateTime)));
            if (day === scheduleDate.getDate() && month === scheduleDate.getMonth() && year === scheduleDate.getFullYear()) {
              var node = document.createElement("LI");
              node.className += " list-group-item";
              var textnode = document.createTextNode(scheduleDate);
              node.appendChild(textnode);
              scheduleCard.appendChild(node);
            }
          }
        });
      }
      else {
        console.log('Nope');
      }
  };

  onChange = value => this.setState({ value })

    render() {
        const { value } = this.state;
        return (
          <div className="content">
            <div className="container-fluid">
              <div className="calendar-main-panel">
                <div className="row">
                  <div className="col-md-5">
                    <div className="calendar">
                      <Calendar 
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
                  <button onClick={(e) => this.handleItemClick(e, 'sign-in')}>sign-in</button>
                  <button onClick={(e) => this.handleItemClick(e, 'sign-out')}>sign-out</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default CalendarPage