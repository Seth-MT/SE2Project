import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [verified, setVerified] = useState([]);
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

  const DeletePost = async (postID) => {
    try {
      const body = { postID };
      const res = await fetch("/posts/delete", {
        method: "DELETE",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseData = await res.json();
      if (parseData === "Post deleted!") {
        toast.success(parseData, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => window.location.reload(),
        });
      } else {
        toast.error("Problems deleting post");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="mt-5 text-center">Posts</h1>
      <div className="mr-5 text-right">
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
                  {post.user.id === verified.userID ? (
                    <div>
                      <svg
                        onClick={() => {
                          if (window.confirm("Delete this post?")) {
                            DeletePost(post.id);
                          }
                        }}
                        data-tip
                        data-for="Delete"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="ml-4 bi bi-trash"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                      <ReactTooltip id="Delete" effect="solid">
                        <span>Delete</span>
                      </ReactTooltip>
                    </div>
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
