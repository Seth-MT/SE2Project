import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  // const [verified, setVerified] = useState(false)
  async function getPosts() {
    try {
      const res = await fetch("/posts/", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setPosts(parseData);
    } catch (err) {
      console.error(err.message);
    }
  }

  //Get posts data
  useEffect(() => {
    getPosts();
  }, []);

  const hoverCard = (cardId) => {
    setActiveCard(cardId);
  };

  const verifyUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      // setVerified(parseData)
      if (parseData === true) {
        window.location.href = "/createposts";
      } else {
        toast.error("You need to be logged in", {
          position: "top-right",
          autoClose: 1750,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="mt-5 text-center">Posts</h1>
      <div className="mr-5 text-right">
        <button className="btn btn-primary" onClick={(e) => verifyUser(e)}>
          Create Post
        </button>
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
                <div className="col-sm-8 border-border-dark">
                  <div className="card-body">
                    <h4 className="card-title">{post.title}</h4>
                    <h6 className="card-text">{post.description}</h6>
                  </div>
                  <div className="text-right">
                    <p className="card-text">
                      <small>Last updated at: {post.updatedAt}</small>
                    </p>
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
