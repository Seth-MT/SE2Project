import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [profileImage, setImage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [hairType, setHairType] = useState("");
  const [hairLength, setHairLength] = useState("");
  const [bleach, setBleach] = useState(false);
  const [coloring, setColoring] = useState(false);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
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
  }, []);

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

    //Change profile image to file uploaded
    setImage(file.secure_url);
    setLoading(false);
  };

  //Send updated profile name and profile picture to backend server
  const fileUploadHandler = async () => {
    try {
      const body = {
        profileImage,
        newName,
        dateOfBirth,
        sex,
        hairType,
        hairLength,
        bleach,
        coloring,
      };

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
  const inputNameHandler = async (e) => {
    try {
      setNewName(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Set dateOfBirth state to the value entered by user
  const inputDOBHandler = async (e) => {
    try {
      setDateOfBirth(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Set sex state to the value entered by user
  const inputSexHandler = async (e) => {
    try {
      setSex(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Set hair type state to the value entered by user
  const inputHairTypeHandler = async (e) => {
    try {
      setHairType(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Set hair length state to the value entered by user
  const inputHairLengthHandler = async (e) => {
    try {
      setHairLength(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Set bleach state to the value entered by user
  const inputBleachHandler = async (e) => {
    try {
      setBleach(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  //Set color state to the value entered by user
  const inputColorHandler = async (e) => {
    try {
      setColoring(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="mt-5 text-center">Profile</h1>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md2 text-center">
            {loading ? (
              <h5>Loading...</h5>
            ) : (
              <img
                id="image"
                src={profileImage}
                width="171"
                height="180"
                alt="loading img"
              />
            )}
          </div>
          <div className="col">
            <h2 className="text-left">Welcome, {name}</h2>
          </div>
        </div>
        <form onSubmit={(e) => fileUploadHandler(e)}>
          <div className="form-group">
            <input
              name="file"
              type="file"
              onChange={(e) => fileSelectedHandler(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder={name}
              defaultValue={name}
              onChange={(e) => inputNameHandler(e)}
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
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dateOfBirth"
              onChange={(e) => inputDOBHandler(e)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="sex">Sex</label>
            <select
              className="form-control"
              id="sex"
              onChange={(e) => inputSexHandler(e)}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="hairType">Hair Type</label>
            <select
              className="form-control"
              id="hairType"
              onChange={(e) => inputHairTypeHandler(e)}
            >
              <option>Straight</option>
              <option>Wavy</option>
              <option>Curly</option>
              <option>Coily</option>
            </select>
          </div>
          <div className="row form-group">
            <div className="col-md-4">
              <label htmlFor="hairLength">Estimated Hair Length</label>
            </div>
            <div className="col-lg-1 col-md-2">
              <input
                type="number"
                className="form-control-inline hairLength"
                name="hairLength"
                onChange={(e) => inputHairLengthHandler(e)}
                style={{ width: 45 + "px" }}
              ></input>
            </div>
            <div className="col-lg-7 col-md-6">
              <span> inches</span>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-4">
              <label>History of bleaching</label>
            </div>
            <div className="col-md-2">
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="bleached"
                  id="bleachYes"
                  onChange={(e) => inputBleachHandler(e)}
                ></input>
                <label className="form-check-label" htmlFor="bleachYes">
                  Yes
                </label>
              </div>
            </div>
            <div className="col-md-2">
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="bleached"
                  id="bleachNo"
                  onChange={(e) => inputBleachHandler(e)}
                ></input>
                <label className="form-check-label" htmlFor="bleachNo">
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-4">
              <label>History of coloring</label>
            </div>
            <div className="col-md-2">
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="colored"
                  id="colorYes"
                  onChange={(e) => inputColorHandler(e)}
                ></input>
                <label className="form-check-label" htmlFor="colorYes">
                  Yes
                </label>
              </div>
            </div>
            <div className="col-md-2">
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="colored"
                  id="colorNo"
                  onChange={(e) => inputColorHandler(e)}
                ></input>
                <label className="form-check-label" htmlFor="colorNo">
                  No
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Save Changes
          </button>
        </form>
      </div>

      <div className="row">
        <div className="col mt-5 text-center">
          <button onClick={(e) => logout(e)} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
