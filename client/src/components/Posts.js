/* REQUIREMENTS TRACEABILITY:

This page fulfills the following requirements:
  USER REQUIREMENTS:
  19. System shall allow user’s posted hairstyles to be viewed by other users 

  FUNCTIONAL SYSTEM REQUIREMENTS:
  19.1 When a user selects and views hairstyles or products, they can leave star reviews or comments about the product or hairstyle. 
*/

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Reacts from "./Reacts";

const Posts = () => {
  //The variableS and functionS used to set data about posts, activeCard on hover, verified user information and sorting
  const [posts, setPosts] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [verified, setVerified] = useState([]);
  const [activeSort, setActiveSort] = useState("");

  //Get data on all posts stored in the database
  async function getPosts() {
    try {
      const res = await fetch("/posts/", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setPosts(
        parseData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setActiveSort("new");
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  //Verifies a user a exists and set their username and id.
  const verifyUser = async () => {
    try {
      const res = await fetch("/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setVerified(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const hoverCard = (cardId) => {
    setActiveCard(cardId);
  };

  //Sort by newest post
  const toggleNewest = () => {
    try {
      setPosts(
        [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setActiveSort("new");
    } catch (err) {
      console.error(err.message);
    }
  };

  //Sort by oldest post
  const toggleOldest = () => {
    try {
      setPosts(
        [...posts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
      setActiveSort("old");
    } catch (err) {
      console.error(err.message);
    }
  };

  //Sort by most popular post
  const togglePopular = () => {
    try {
      setPosts([...posts].sort((a, b) => b.likes - a.likes));
      setActiveSort("popular");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="mt-5 text-center">Posts</h1>
      <div className="row">
        <div className="col-md-2 offset-md-1">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button
                className={
                  activeSort === "new"
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                onClick={() => toggleNewest()}
              >
                Newest
              </button>
              <button
                className={
                  activeSort === "old"
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                onClick={() => toggleOldest()}
              >
                Oldest
              </button>
              <button
                className={
                  activeSort === "popular"
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                onClick={() => togglePopular()}
              >
                Most Popular
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2 offset-md-7">
          <button
            className="btn btn-primary"
            onClick={() => {
              verified.auth
                ? (window.location.href = "/createposts")
                : toast.error("You need to be logged in", {
                    position: "top-right",
                    autoClose: 1750,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            }}
          >
            Create Post
          </button>
        </div>
      </div>
      <div className="container mt-5">
        {posts.map(function (post) {
          return (
            <div
              key={post.id}
              className={
                post.id === activeCard
                  ? "card text-white bg-secondary mb-4 h-90"
                  : "card bg-light mb-3"
              }
              onMouseOver={() => hoverCard(post.id)}
              onMouseLeave={() => hoverCard(null)}
            >
              <div className="row no-gutters">
                <div className="col-sm-2">
                  <img
                    className="card-img-top"
                    src={post.styleImgUrl}
                    style={{ width: "100%" }}
                    alt="..."
                  />
                </div>
                <div className="col-sm-10">
                  <div className="card-body">
                    <h4 className="card-title">{post.title}</h4>
                    <h6 className="card-text">{post.description}</h6>
                  </div>
                  {post.user.id === verified.userID ? ( //If the user is logged in then display like, disclick and delete buttons
                    <Reacts post={post} />
                  ) : (
                    <div></div>
                  )}
                  <div className="col text-right">
                    <div className="card-text">
                      Made by: {post.user.userName}
                    </div>
                    <div className="mt-0 card-text">
                      <small>Last updated at: {post.updatedAt}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
