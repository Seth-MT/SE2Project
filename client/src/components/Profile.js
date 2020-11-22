import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";

const Profile = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [profileImage, setImage] = useState("");
  const [show, setModal] = useState(false);
  const [selectedFile, setFile] = useState(null);

  const handleModal = () => {
    setModal(!show);
  };

  const getProfile = async () => {
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
  };

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

  useEffect(() => {
    getProfile();
  }, []);

  const fileSelectedHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const headers = { token: localStorage.token };

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("profileImage", selectedFile, selectedFile.name);

    axios
      .put("/profile/icon", fd, {
        headers: headers,
      })
      .then((res) => {
        const imageUploaded = res.data;
        console.log(res);
        toast.success(imageUploaded);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <h1 className="mt-5 text-center">Profile</h1>
      <Container>
        <Row className="align-items-center">
          <div className="col-md2 text-center">
            <Image
              src={profileImage}
              roundedCircle
              width={171}
              height={180}
              alt="Profile Image"
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
                    <Image
                      src={profileImage}
                      roundedCircle
                      width={101}
                      height={110}
                      alt="Profile Image"
                    />
                  </div>

                  <div className="col-md-auto">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={name}
                      disabled
                    />
                    <input
                      type="file"
                      onChange={(e) => fileSelectedHandler(e)}
                    />
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
              <Button variant="primary" onClick={(e) => fileUploadHandler(e)}>
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
