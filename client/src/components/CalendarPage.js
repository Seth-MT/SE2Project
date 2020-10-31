import React, { Component } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../App.css';

class CalendarPage extends Component {
    state = {
      value: new Date(),
    }

    changeSelectedDate = date => {
      alert(date);
    };

    render() {
        const { value } = this.state;
        return (
          <div className="content">
            <div className="container-fluid">
              <div className="main-panel">
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
              </div>
            </div>
          </div>
        )
    }
}

export default CalendarPage