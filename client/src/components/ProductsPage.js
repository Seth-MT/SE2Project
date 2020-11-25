import React, { useEffect, useState } from "react";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [colour, setColour] = useState(
      "card text-white bg-secondary mb-4 h-90"
    );
  
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
  
    //Get posts data
    useEffect(() => {
      getProducts();
    }, []);

    return (
        <div className="container-fluid">
          <h1 className="mt-5 text-center">Products</h1>
          <div className="container col-8 mt-5">
            {products.map(function (product) {
              return (
                <div
                  key={product.id}
                  class="Card"
                  // onMouseOver={setColour("card bg-light mb-3")}
                  // onMouseLeave={setColour("card text-white bg-secondary mb-4 h-90")}
                >
                  <div class="row no-gutters">
                    <div class="col-sm-2">
                      <img
                        class="card-img-top"
                        src={product.imageUrl}
                        style={{ width: "100%" }}
                        alt="..."
                      />
                    </div>
                    <div class="col-sm-8 border-border-dark">
                      <div class="card-body">
                        <h4 class="card-title">{product.name}</h4>
                        <h6 class="card-text">{product.description}</h6>
                      </div>
                      <div class="text-right">
                        <p class="card-text">
                          <small>Last updated at: {product.updatedAt}</small>
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

export default ProductsPage;