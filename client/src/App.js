import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import NavBar from "./components/NavBar";

function App() {
  const [user, setAuthenticated] = useState(false);

  const setUser = (boolean) => {
    setAuthenticated(boolean);
  };

  return (
    <div className="wrapper">
      <Router>
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
