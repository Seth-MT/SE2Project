import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalendarPage from "./CalendarPage";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
<<<<<<< HEAD
import FormPage from "./FormPage";
=======
import PageNotFound from "./PageNotFound.js";
>>>>>>> master

toast.configure();

function Main({ setUser }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const res = await fetch("/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

      setUser(isAuthenticated);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <div className="main-panel">
      <Switch>
<<<<<<< HEAD
        <Route path="/edit" component={FormPage} />
        <Route path="./" component={Home} />
=======
        <Route exact path="/" component={Home} />
>>>>>>> master
        <Route path="/calendar" component={CalendarPage} />
        <Route
          exact
          path="/register"
          render={(props) =>
            !isAuthenticated ? (
              <Register {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={(props) =>
            !isAuthenticated ? (
              <Login {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/profile" />
            )
          }
        />
        <Route
          exact
          path="/profile"
          render={(props) =>
            isAuthenticated ? (
              <Profile {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route component= {PageNotFound} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}

export default Main;
