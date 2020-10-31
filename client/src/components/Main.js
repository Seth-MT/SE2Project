import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import CalendarPage from './CalendarPage'


class Main extends Component {
  render() {
    return (
      <div className="main-panel">
        <Switch>
          <Route path="/calendar" component={CalendarPage} />
          <Redirect from='*' to='/calendar' />
        </Switch>
      </div>
    )
  }
}

export default Main