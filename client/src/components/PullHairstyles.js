import React, { useEffect, useState } from "react";

const PullHairstyles = () => {
    const [Hairstyles, setHairstyles] = useState([]);
  
    async function getHairstyles() {
      try {
        const res = await fetch("/styles/", {
          method: "POST",
          headers: { token: localStorage.token },
        });
  
        const parseData = await res.json();
        setHairstyles(parseData);
      } catch (err) {
        console.error(err.message);
      }
    }
  
    //Get hairstyle data
    useEffect(() => {
      getHairstyles();
    }, []);

    return (
        Hairstyles
      );
    };

export default PullHairstyles;