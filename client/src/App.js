import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import NavBar from "./components/NavBar";

function App() {
  const [user, setAuthenticated] = useState(false);

  //Function used to get authentication information from child component Main.js
  const setUser = (boolean) => {
    setAuthenticated(boolean);
  };

  return (
    <div className="wrapper">
      <Router>
        {/* Lets the navbar know whether a user is authenticated on every page */}
        <NavBar user={user} />

        <Switch>
          <Route
            path="/"
            render={(props) => <Main {...props} setUser={setUser} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
