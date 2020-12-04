import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalendarPage from "./CalendarPage";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Posts from "./Posts";
import CreatePosts from "./CreatePosts";
// import FormPage from "./FormPage";
import PageNotFound from "./PageNotFound.js";
import ProductsPage from "./ProductsPage";
import HairstylesPage from "./HairstylesPage"
import AR_Camera from "./AR";

toast.configure();

function Main({ setUser }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

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
      parseRes.auth === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);

      setUser(isAuthenticated);
      setLoading(false);
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
        <Route exact path="/" component={Home} />
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
        <Route exact path="/posts" render={() => <Posts />} />
        <Route
          exact
          path="/createposts"
          render={() =>
            isLoading ? (
              <div
                className="container d-flex h-100"
                style={{ marginTop: "50%" }}
              >
                <div
                  className="justify-content-center align-self-center spinner-grow text-info"
                  role="status"
                  style={{ width: "3rem", height: "3rem" }}
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : isAuthenticated ? (
              <CreatePosts />
            ) : (
              toast.error("Please log in", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => (window.location.href = "/login"),
              })
            )
          }
        />

        <Route exact path="/posts" render={() => <Posts />} />
        <Route path = "/products" render={() => <ProductsPage/>}/>
        <Route path = "/hairstyles" render={() => <HairstylesPage/>}/>
        <Route path = "/ARCamera" component = {AR_Camera}/>
        <Route component= {PageNotFound} />

        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}

export default Main;
