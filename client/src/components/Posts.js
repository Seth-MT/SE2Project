import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [verified, setVerified] = useState([]);
  const [activeSort, setActiveSort] = useState("");
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState(false);

  async function getPosts() {
    try {
      const res = await fetch("/posts/", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();

      const likedPosts = parseData
        .filter((item) => item.userreacts[0].liked === "liked")
        .map((post) => post.id);

      setLiked(likedPosts);
      setPosts(
        parseData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setActiveSort("new");
    } catch (err) {
      console.error(err.message);
    }
  }

  //Get posts data
  useEffect(() => {
    getPosts();
  }, []);

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

  const hoverCard = (cardId) => {
    setActiveCard(cardId);
  };

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

  const togglePopular = () => {
    try {
      setPosts([...posts].sort((a, b) => b.likes - a.likes));
      setActiveSort("popular");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLike = async (postID) => {
    try {
      let like = !liked.includes(postID);

      let react = "";
      if (like === true) {
        react = "liked";
        setLiked(liked.push(postID));
      } else if (like === false) {
        react = "notliked";
        let index = liked.indexOf(postID);
        setLiked(liked.splice(index, 1));
      }

      let body = { postID, react };
      const res = await fetch("/posts/react", {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseData = await res.json();
      const selectedPost = posts.findIndex((item) => item.id === postID);
      const newPosts = [...posts];
      newPosts[selectedPost].likes = parseData.likes;
      setPosts(newPosts);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateColor = (postID) => {
    for (var i = 0; i < liked.length; i++) {
      if (liked[i] === postID) {
        return "blue";
      } else {
        return "red"; //black
      }
    }
  };

  // useEffect(() => {
  //   handleLike();
  //   updateColor();
  // }, []);

  const handleDislike = async (postID, dislike) => {
    try {
      setDisliked(dislike);
      let react = "";
      if (dislike === true) {
        react = "disliked";
      } else if (dislike === false) {
        react = "notdisliked";
      }
      let body = { postID, react };
      const res = await fetch("/posts/react", {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseData = await res.json();
      const selectedPost = posts.findIndex((item) => item.id === postID);
      const newPosts = [...posts];
      newPosts[selectedPost].dislikes = parseData.dislikes;
      setPosts(newPosts);
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
                    <span>
                      <svg
                        onClick={() => {
                          handleLike(post.id);
                        }}
                        style={{ color: updateColor(post.id) }}
                        data-tip
                        data-for="Like"
                        width="1.3em"
                        height="1.3em"
                        viewBox="0 0 16 16"
                        className="ml-4 bi bi-hand-thumbs-up"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"
                        />
                      </svg>
                      <ReactTooltip id="Like" effect="solid">
                        <span>Like</span>
                      </ReactTooltip>
                      <span>{post.likes}</span>
                      <svg
                        onClick={() => {
                          handleDislike(post.id);
                        }}
                        style={
                          disliked ? { color: "blue" } : { color: "black" }
                        }
                        data-tip
                        data-for="Dislike"
                        width="1.3em"
                        height="1.3em"
                        viewBox="0 0 16 16"
                        className="ml-2 bi bi-hand-thumbs-down"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28v1c.563 0 .901.272 1.066.56.086.15.121.3.121.416 0 .12-.035.165-.04.17l-.354.353.353.354c.202.202.407.512.505.805.104.312.043.44-.005.488l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.415-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.353.352.373.714.267 1.021-.122.35-.396.593-.571.651-.653.218-1.447.224-2.11.164a8.907 8.907 0 0 1-1.094-.17l-.014-.004H9.62a.5.5 0 0 0-.595.643 8.34 8.34 0 0 1 .145 4.725c-.03.112-.128.215-.288.255l-.262.066c-.306.076-.642-.156-.667-.519-.075-1.081-.239-2.15-.482-2.85-.174-.502-.603-1.267-1.238-1.977C5.597 8.926 4.715 8.23 3.62 7.93 3.226 7.823 3 7.534 3 7.28V3.279c0-.26.22-.515.553-.55 1.293-.138 1.936-.53 2.491-.869l.04-.024c.27-.165.495-.296.776-.393.277-.096.63-.163 1.14-.163h3.5v-1H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"
                        />
                      </svg>
                      <ReactTooltip id="Dislike" effect="solid">
                        <span>Dislike</span>
                      </ReactTooltip>
                      <span>{post.dislikes}</span>
                      <svg
                        onClick={() => {
                          if (window.confirm("Delete this post?")) {
                            DeletePost(post.id);
                          }
                        }}
                        data-tip
                        data-for="Delete"
                        width="1.3em"
                        height="1.3em"
                        viewBox="0 0 16 16"
                        className="ml-2 bi bi-trash"
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
                    </span>
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
