import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";

const Profile = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [profileImage, setImage] = useState("");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setModal] = useState(false);
  const [inputStatus, setStatus] = useState("");

  //Get username and profile image
  useEffect(() => {
    async function getProfile() {
      try {
        const res = await fetch("/profile/", {
          method: "POST",
          headers: { token: localStorage.token },
        });

        const parseData = await res.json();
        setName(parseData.userName);
        setImage(parseData.profileImage);
      } catch (err) {
        console.error(err.message);
      }
    }

    getProfile();
  }, [name, profileImage]);

  //Logout user
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successful");
    } catch (err) {
      console.error(err.message);
    }
  };

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
    console.log(file.secure_url);

    //Change profile image to file uploaded
    setImage(file.secure_url);
    setLoading(false);
  };

  //Send updated profile name and profile picture to backend server
  const fileUploadHandler = async () => {
    try {
      const body = { profileImage, newName };

      const res = await fetch("/profile/update", {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const uploadStatus = await res.json();
      toast.success(uploadStatus, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => window.location.reload(),
      });
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    }
  };

  //When newName state is updated then post to backend server to check if name is available
  useEffect(() => {
    const inputSubmitter = async () => {
      try {
        if (newName) {
          const body = { newName };
          const status = await fetch("/profile/userExists", {
            method: "POST",
            headers: {
              token: localStorage.token,
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          });

          const parseMessage = await status.json();
          console.log(parseMessage);
          setStatus(parseMessage);
        }
      } catch (err) {
        console.error(err);
      }
    };
    inputSubmitter();
  }, [newName]);

  //Set newName state to the value entered by user
  const inputHandler = async (e) => {
    try {
      setNewName(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Toggle modal
  const handleModal = () => {
    setModal(!show);
  };

  return (
    <div className="container-fluid">
      <h1 className="mt-5 text-center">Profile</h1>
      <Container>
        <Row className="align-items-center">
          <div className="col-md2 text-center">
            <img
              id="image"
              src={profileImage}
              width="171"
              height="180"
              alt="loading img"
            />
          </div>
          <Col>
            <h2 className="text-left">Welcome, {name}</h2>
          </Col>
        </Row>
        <Row>
          <Button
            onClick={() => handleModal()}
            style={{ backgroundColor: "purple" }}
          >
            Edit Profile
          </Button>
          <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={() => handleModal()}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Profile details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <div className="row">
                  <div className="col-md3 text-center">
                    {loading ? (
                      <h5>Loading...</h5>
                    ) : (
                      <Image
                        src={profileImage}
                        roundedCircle
                        width={101}
                        height={110}
                        alt="Profile Image"
                      />
                    )}
                  </div>

                  <div className="col-md-auto">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={name}
                      onChange={(e) => inputHandler(e)}
                    />
                    {
                      //Check if username available
                      inputStatus === "User already exists" ? (
                        <div style={{ color: "red" }}> {inputStatus} </div>
                      ) : inputStatus === "No change" ? (
                        <div></div>
                      ) : inputStatus === "Name available!" ? (
                        <div style={{ color: "green" }}> {inputStatus} </div>
                      ) : (
                        <div></div>
                      )
                    }
                    <div>
                      <input
                        name="file"
                        type="file"
                        onChange={fileSelectedHandler}
                      />
                    </div>
                  </div>
                </div>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              By proceeding, you agree to give The Hair Thing access to the
              image you choose to upload.
              <Button variant="secondary" onClick={() => handleModal()}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={(e) => fileUploadHandler(e)}
                disabled={loading}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </Container>

      <div className="row">
        <div className="col text-center">
          <button onClick={(e) => logout(e)} className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
