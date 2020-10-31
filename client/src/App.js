import React, { Component } from 'react'
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom';
import Main from './components/Main'
import NavBar from './components/NavBar'

class App extends Component {
  render() {
    return (
      
      <div className="wrapper">
        <Router>

        <NavBar />

        <Switch>
          <Route path='/' component={Main}/>
        </Switch>

        </Router>
      </div>
    )
  }
}

export default App