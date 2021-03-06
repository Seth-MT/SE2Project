import React, { useState } from "react";
import { toast } from "react-toastify";

const CreatePosts = () => {
  const [inputs, setInputs] = useState({
    postTitle: "",
    postDescription: "",
  });
  const [hairStyleImg, setImage] = useState(
    "https://icons-for-free.com/iconfiles/png/512/box+document+outline+share+top+upload+icon-1320195323221671611.png"
  );

  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const { postTitle, postDescription } = inputs;
  const [activeCard, setActiveCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  //Send uploaded image to Cloudinary
  const fileSelectedHandler = async (e) => {
    const files = e.target.files;
    const fd = new FormData();

    fd.append("file", files[0]);

    //Cloudinary upload preset
    fd.append("upload_preset", "se2project");

    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtqlgbedo/image/upload",
      {
        method: "POST",
        body: fd,
      }
    );

    const file = await res.json();

    //Change post's hairstyle image to file uploaded
    setImage(file.secure_url);
    setLoading(false);
  };

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  //Send title, description and hairstyle picture to backend server
  const postUploadHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { postTitle, postDescription, hairStyleImg };

      const res = await fetch("/posts/create", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      setPostLoading(true);
      const uploadStatus = await res.json();
      if (uploadStatus === "Post created successfully!") {
        toast.success(uploadStatus, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => (window.location.href = "/posts"),
        });
      } else {
        toast.error(uploadStatus);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error creating post");
    }
  };

  //Get styles data
  const [styles, setStyles] = useState([]);

  const getStyles = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/styles/", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setStyles(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const hoverCard = (cardId) => {
    setActiveCard(cardId);
  };

  const selectCard = (cardId) => {
    setSelectedCard(cardId);
  };

  const updateImage = () => {
    setLoading(true);
    const selectedStyle = styles.filter((item) => {
      return item.id === selectedCard;
    });
    console.log(selectedStyle);
    setImage(selectedStyle[0].imageUrl);
    setLoading(false);
  };

  return (
    <div className="container-fluid">
      <h1 className="mt-3 text-center">Create Post</h1>
      <div className="container col-9 mt-5">
        <form onSubmit={postUploadHandler}>
          <div className="row">
            <div className="col md-6">
              <div className="card img-fluid">
                <div className="mt-3 text-center">
                  {loading ? (
                    <h5>Loading...</h5>
                  ) : (
                    <img
                      className="card-img-top"
                      src={hairStyleImg}
                      alt="HairstyleImage"
                      style={{ width: "60%" }}
                    />
                  )}
                </div>
                <div className="card-img-overlay">
                  <h4 className="card-title text-center">
                    Select one of our hairstyles
                  </h4>
                  <div className="text-center">
                    <button
                      className="btn btn-primary stretched-link"
                      data-toggle="modal"
                      data-target="#hairStyleModal"
                      onClick={(e) => getStyles(e)}
                      style={{ backgroundColor: "DimGray" }}
                    >
                      Select
                    </button>
                  </div>
                </div>
                <div className="card-footer">
                  <h6 className="card-text">Upload your own hairstyle: </h6>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="file"
                      className="custom-file-input"
                      id="customFile"
                      onChange={(e) => fileSelectedHandler(e)}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose file
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col auto">
              <div className="form-group">
                <label htmlFor="FormControlTitle">Enter Title:</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="postTitle"
                  required
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="FormControlTextarea1">Enter Description:</label>
                <textarea
                  className="form-control"
                  name="postDescription"
                  rows="14"
                  required
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col text-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading || postLoading}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>

      <div
        className="modal fade"
        id="hairStyleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="hairstyleModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="hairStyleModalTitle">
                Hair Styles
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="card-columns">
                {styles.map(function (style) {
                  return (
                    <div
                      key={style.id}
                      className={
                        style.id === activeCard && style.id === selectedCard
                          ? "card text-white bg-info mb-3"
                          : style.id === activeCard
                          ? "card text-info border-info mb-3"
                          : style.id === selectedCard
                          ? "card text-white bg-info mb-3"
                          : "card"
                      }
                      onMouseOver={() => hoverCard(style.id)}
                      onMouseLeave={() => hoverCard(null)}
                      onClick={() => selectCard(style.id)}
                    >
                      <img
                        className="card-img-top"
                        src={style.imageUrl}
                        alt="Hairstyle"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{style.name}</h5>
                        <p className="card-text">
                          <i>Recommended use:</i> {style.type} <br />
                          <i>Hair length:</i> {style.hairLength}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => updateImage()}
              >
                Add Hairstyle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePosts;
