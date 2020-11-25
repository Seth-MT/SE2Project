import React, { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [colour, setColour] = useState(
    "card text-white bg-secondary mb-4 h-90"
  );

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

  return (
    <div className="container-fluid">
      <h1 className="mt-5 text-center">Posts</h1>
      <div className="mr-5 text-right">
        <a href="/createposts" className="btn btn-primary">
          Create Post
        </a>
      </div>
      <div className="container col-8 mt-5">
        {posts.map(function (post) {
          return (
            <div
              key={post.id}
              class={colour}
              // onMouseOver={setColour("card bg-light mb-3")}
              // onMouseLeave={setColour("card text-white bg-secondary mb-4 h-90")}
            >
              <div class="row no-gutters">
                <div class="col-sm-2">
                  <img
                    class="card-img-top"
                    src={post.styleImgUrl}
                    style={{ width: "100%" }}
                    alt="..."
                  />
                </div>
                <div class="col-sm-8 border-border-dark">
                  <div class="card-body">
                    <h4 class="card-title">{post.title}</h4>
                    <h6 class="card-text">{post.description}</h6>
                  </div>
                  <div class="text-right">
                    <p class="card-text">
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
