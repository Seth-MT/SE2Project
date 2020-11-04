import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import CalendarPage from './CalendarPage'
import Home from './Home'
import Register from './Register'
import Login from './Login'



class Main extends Component {
  render() {
    return (
      <div className="main-panel">
        <Switch>
          <Route path="./" component={Home} />
          <Route path="/calendar" component={CalendarPage} />  
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Redirect from='*' to='/' />
        </Switch>
      </div>
    )
  }
}

export default Main