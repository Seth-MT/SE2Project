import React, { useEffect, useState } from "react";

//similar to Posts.js but without the CreatePost component

const GetPosts = () => {
  const [posts, setPosts] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

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

  return (
      <div className="container">
        {posts.map(function (post) {
          return (
            <div
              key={post.id}
              class={
                post.id === activeCard
                  ? "card text-white bg-secondary mb-4 h-90"
                  : "card bg-light mb-3"
              }
              onMouseOver={() => hoverCard(post.id)}
              onMouseLeave={() => hoverCard(null)}
            >
              <div class="row no-gutters">
                <div class="col-sm-2">
                 <a href='/post'>
                    <img
                        class="card-img-top"
                        src={post.styleImgUrl}
                        style={{ width: "100%" }}
                        alt="..."
                    />
                 </a>
                </div>
                <div class="col-sm-8 border-border-dark">
                  <a href='/posts' style={{color:'black'}}>
                    <div class="card-body">
                        <h4 class="card-title">{post.title}</h4>
                        <h6 class="card-text">{post.description}</h6>
                    </div>
                    <div className="col text-right">
                    <div className="card-text">
                      <i><b>Made by: {post.user.userName}</b></i>
                    </div>
                    <div className="mt-0 card-text">
                      <small>Last updated at: {post.updatedAt}</small>
                    </div>
                  </div>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
  );
};

export default GetPosts;
