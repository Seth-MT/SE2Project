import React, { Component } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import ApiCalendar from 'react-google-calendar-api';

function listEm() {
  if (ApiCalendar.sign) {
  ApiCalendar.listUpcomingEvents(10)
    .then(({result}) => {
      console.log('Yep');
      console.log(result.items);
    });
  }
  else {
    console.log('Nope');
  }
}
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
    alert(date.getDate());
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
                      <div className="card calendar-card h-100">
                        <span>Schedule stuff goes here</span>
                      </div>
                  </div>
                </div>
                <div className="google-calendar-buttons">
                    <button
                  onClick={(e) => this.handleItemClick(e, 'sign-in')}
              >
                sign-in
              </button>
              <button
                  onClick={(e) => this.handleItemClick(e, 'sign-out')}
              >
                sign-out
              </button>
                    <pre id="content" style={{whiteSpace: 'pre-wrap'}}></pre>
                  <button id="test" onClick={listEm}>Test</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default CalendarPage