import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "@ant-design/compatible";
import ReactTooltip from "react-tooltip";

const Reacts = ({ post }) => {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  const [DeleteAction, setDeleteAction] = useState(false);

  useEffect(() => {
    setLikes(post.likes);
    setDislikes(post.dislikes);
    if (post.userreacts.length > 0) {
      if (post.userreacts[0].liked === "liked") {
        setLikeAction("liked");
      } else if (post.userreacts[0].liked === "disliked") {
        setDislikeAction("disliked");
      }
    }
  }, []);

  const DeletePost = async () => {
    try {
      setDeleteAction(true);
      let postID = post.id;
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
        setDeleteAction(false);
      } else {
        toast.error("Problems deleting post");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const onLike = async () => {
    try {
      let react = "";
      let postID = post.id;

      if (LikeAction === null) {
        let react = "liked";
        let body = { postID, react };
        const res = await fetch("/posts/upLike", {
          method: "PUT",
          headers: {
            token: localStorage.token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const parseData = await res.json();

        if (parseData === "Success") {
          setLikes(Likes + 1);
          setLikeAction("liked");

          //If dislike button already clicked then minus one from dislikes
          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          toast.error("Couldn't like post");
        }
      } else {
        react = "noreact";
        let body = { postID, react };
        const res = await fetch("/posts/unLike", {
          method: "PUT",
          headers: {
            token: localStorage.token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const parseData = await res.json();

        if (parseData === "Success") {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          toast.error("Couldn't remove like");
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const onDisLike = async () => {
    try {
      let react = "";
      let postID = post.id;

      if (DislikeAction === null) {
        let react = "disliked";
        let body = { postID, react };
        const res = await fetch("/posts/upDislike", {
          method: "PUT",
          headers: {
            token: localStorage.token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const parseData = await res.json();

        if (parseData === "Success") {
          setDislikes(Dislikes + 1);
          setDislikeAction("disliked");

          //If like button already clicked then minus one from likes
          if (LikeAction != null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          toast.error("Couldn't dislike post");
        }
      } else {
        react = "noreact";
        let body = { postID, react };
        const res = await fetch("/posts/unDisLike", {
          method: "PUT",
          headers: {
            token: localStorage.token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const parseData = await res.json();

        if (parseData === "Success") {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          toast.error("Couldn't remove dislike");
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <span className="ml-4">
      <span>
        <Icon
          data-tip
          data-for="Like"
          type="like"
          theme={LikeAction === "liked" ? "filled" : "outlined"}
          onClick={onLike}
        />
        <span style={{ paddingLeft: "4px", cursor: "auto" }}>{Likes}</span>
        <ReactTooltip id="Like" effect="solid">
          <span>Like</span>
        </ReactTooltip>
      </span>
      &nbsp;&nbsp;
      <span>
        <Icon
          data-tip
          data-for="Dislike"
          type="dislike"
          theme={DislikeAction === "disliked" ? "filled" : "outlined"}
          onClick={onDisLike}
        />
        <span style={{ paddingLeft: "4px", cursor: "auto" }}>{Dislikes}</span>
        <ReactTooltip id="Dislike" effect="solid">
          <span>Dislike</span>
        </ReactTooltip>
      </span>
      &nbsp;&nbsp;
      <span>
        <Icon
          data-tip
          data-for="Delete"
          type="delete"
          theme={DeleteAction ? "filled" : "outlined"}
          onClick={() => {
            if (window.confirm("Delete this post?")) {
              DeletePost(post.id);
            }
          }}
        />
        <ReactTooltip id="Delete" effect="solid">
          <span>Delete Post</span>
        </ReactTooltip>
      </span>
    </span>
  );
};

export default Reacts;
