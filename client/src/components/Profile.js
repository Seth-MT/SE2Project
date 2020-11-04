// import React, { Fragment, useState, useEffect } from "react";

// const Profile = ({ setAuth }) => {
//   const [name, setName] = useState("");

//   async function getName() {
//     try {
//       //https://thehairthing.herokuapp.com/
//       const res = await fetch("http//localhost:5000/profile/", {
//         method: "POST",
//         headers: { token: localStorage.token },
//       });

//       const parseRes = await res.json();

//       console.log(parseRes);

//       setName(parseRes.userName);
//     } catch (err) {
//       console.error(err.message);
//     }
//   }

//   useEffect(() => {
//     getName();
//   }, []);

//   const logout = async (e) => {
//     e.preventDefault();
//     try {
//       localStorage.removeItem("token");
//       setAuth(false);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   return (
//     <Fragment>
//       <div>
//         <h1>Profile</h1>
//         <h2>Welcome {name} </h2>
//         <button className="btn btn-primary" onClick={(e) => logout(e)}>
//           Logout
//         </button>
//       </div>
//     </Fragment>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      //https://thehairthing.herokuapp.com
      const res = await fetch("/profile/", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);
      setName(parseData.userName);
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

  return (
    <div>
      <h1 className="mt-5">Dashboard</h1>
      <h2>Welcome {name}</h2>
      <button onClick={(e) => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Profile;
