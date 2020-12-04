import React, { useEffect, useState } from "react";

const PullProducts = () => {
    const [products, setProducts] = useState([]);
  
    async function getProducts() {
      try {
        const res = await fetch("/products/all", {
          method: "GET",
          headers: { token: localStorage.token },
        });
  
        const parseData = await res.json();
        console.log(products)
        setProducts(parseData);
      } catch (err) {
        console.error(err.message);
      }
    }
  
    //Get product data
    useEffect(() => {
      getProducts();
    }, []);

    return (
        products
      );
    };

export default PullProducts;