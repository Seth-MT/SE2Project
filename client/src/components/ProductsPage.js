import React from "react";
import PullProducts from "./PullProducts";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns'


const ProductsPage = () => {
    
  var products = PullProducts()

    return (
        <div className="container-fluid home-page-background">
          <a href='/products'>
          <h1 style = {{color:'white'}} className="
            text-center products-row-background-colour">
              Products
          </h1>
          </a>
          <div className="container md-8 border border-light background-white">
            <CardColumns align='center' className='background-color-white'> 
            {products.map(function (product) {
              return (
                
                <Card
                border='light' 
                style={{ width: '18rem' }}
                text='light'
                bg='dark'
                key={product.id}                 
                >
                  <Card.Img variant="top" src={product.imageUrl}
                     style={{width: '100%'}} />
                    
                     <Card.Body>
                       <Card.Title ><a href='' class='align-left' style={{color:'white'}}>{product.name}</a></Card.Title>
                       <Card.Text class='text-left'>
                         {product.description}
                       </Card.Text>
                        <div class="text-right">
                          <p class="card-text">
                            <small>Last updated at: {product.updatedAt}</small>
                          </p>
                        </div>
                      </Card.Body>
                 
                </Card>
              );
            })}</CardColumns>
            
          </div>  
        </div>
      );
    };

export default ProductsPage;