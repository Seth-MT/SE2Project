//React 
import React, {Component, Fragment, useState, useEffect} from "react";
import GetPosts from './GetPosts'

//React-bootstrap & bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
import Alert from 'react-bootstrap/Alert';
import PullProducts from './PullProducts'

//Function for Carousel at the top of page
//Currently only contains placeholder text and images
function WelcomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  
  const hStyle1 = { color: 'white' };
  const hStyle2 = { color: 'red' };
  const hStyle3 = { color: 'green' };
  const hStyle4 = { color: 'black' };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <a href='/'>
        <img
          brightness ={500}
          opacity = {0}
          width={400} height={350} 
          className="a-block w-100"
          src="https://ak.picdn.net/shutterstock/videos/1031742335/thumb/1.jpg"
          alt="First slide"
        />
        </a>
        
        <Carousel.Caption>
          
          <div class="row">
            <div class="col md-4">
              <h1><u><a href='/' style={hStyle1}>Welcome to Hair Stylers</a></u></h1>
              <p style={hStyle1}><b>Striving for better hair health in every individual</b></p>
            </div>
          </div>
        
        </Carousel.Caption>
        

      </Carousel.Item>
      <Carousel.Item>
        <a href= '/products'>
          <img
            width={400} height={350} 
            className="d-block w-100"
            src="https://images.askmen.com/1080x540/2020/09/29-040142-25_best_natural_hair_products_for_black_men.jpg"
            alt="Second slide"
          />
        </a>

        <Carousel.Caption>
          <h3><a href='/products' style={hStyle1}><u>Hair Care Products</u></a></h3>
          <p><b>Recommended hair care products by Hair Stylers</b></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <a href='/posts'>
          <img
            width={400} height={350} 
            className="d-block w-100"
            src="https://image.freepik.com/free-vector/happy-businesswoman-with-many-thumbs-up-hands_52569-640.jpg"
            alt="Third slide"
          />
        </a>

        <Carousel.Caption>
          <h3><a href='/posts' style={hStyle1}><u>Popular Hair Styles</u></a></h3>
          <p><b>What our members have been up to</b></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <a href='/ARCamera'>
          <img
            width={400} height={350} 
            className="d-block w-100"
            src="https://d3329inlf62scx.cloudfront.net/app/uploads/2018/09/guy-holding-camera-1460x840.jpg"
            alt="Fourth slide"
          />
        </a>

        <Carousel.Caption>
          <h3><a href='/ARCamera' style={hStyle1}><u>AR Camera</u></a></h3>
          <p><b>Use your device camera to edit AR Hairstyles on yourself</b></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

//function for Featured Hairstyles at top of page
function FeaturedHairStyle(){

  return (
    <Card 
      border='light' 
      style={{ width: '18rem' }}
      text='light'
      bg='dark'>

      <Card.Header>Featured Hairstyle</Card.Header>

      <Card.Img variant="top" src="https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png"
       height={200} width={100} />

      <Card.Body>
        <Card.Title><a href=''>Featured Hairstyle Name</a></Card.Title>       
        <Card.Text>
          Description here.
        </Card.Text>
      </Card.Body>

    </Card>
  );
}

//function for Featured Products
function FeaturedProducts(){

  var {productInventory} = []
  productInventory = PullProducts()

  return (
    <CardDeck>
      <Card 
        border='light' 
        style={{ width: '18rem' }}
        text='light'
        bg='dark'>
        <Card.Header>Shampoo</Card.Header>
        <Card.Img variant="top" src='https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png'
        height={200} width={200} />
        <Card.Body>
          <Card.Title><a href=''>Shampoo Name</a></Card.Title>
          <Card.Text>
            Description here.
          </Card.Text>
        
        </Card.Body>
      </Card>
      <Card 
        border='light' 
        style={{ width: '18rem' }}
        text='light'
        bg='dark'>
        <Card.Header>Conditioner</Card.Header>
        <Card.Img variant="top" src="https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png"
        height={200} width={200} />
        <Card.Body>
          <Card.Title><a href=''>Conditioner Name</a></Card.Title>
          <Card.Text>
            Description here.
          </Card.Text>
      
        </Card.Body>
      </Card>
      <Card 
        border='light' 
        style={{ width: '18rem' }}
        text='light'
        bg='dark'>
        <Card.Header>Hair Dyes</Card.Header>
        <Card.Img variant="top" src="https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png"
        height={200} width={200} />
        <Card.Body>
          <Card.Title><a href=''>Dye Name/Brand</a></Card.Title>
          <Card.Text>
            Description here.
          </Card.Text>
        </Card.Body>
      </Card>
    </CardDeck>
  );
}


//placeholder for Matthew's Calendar
function CalendarPlaceholder(){

  return(
    <Card 
        border='light' 
        style={{ width: '18rem' }}
        text='light'
        bg='dark'>
        <Card.Header>Calendar</Card.Header>
        <Card.Body>
          <Card.Title>
           Calendar Contents go here
          </Card.Title>
        </Card.Body>
      </Card>

  )
}

class Home extends Component {

  render() {

    return( 
     <Fragment>
      <div class="container-fluid home-page-background">

        <div class="container">
          <div class="row">
           <div class="col-md-8">
             <p></p>
             <WelcomeCarousel/>
           </div>
           <div class="col-md-4">
             <p></p>
             <FeaturedHairStyle/>
           </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-md-8 products-row-size products-row-background-colour">
              <h5><u>Featured Products</u></h5>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <FeaturedProducts/>
            </div>
            <div class="col-md-4">
              <CalendarPlaceholder/>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-md-8 products-row-size products-row-background-colour">
              <h5><u>News Feed</u></h5>
            </div>
          </div>

          <div class="row"> 
          <div class="col-md-8 products-row-size">
            <GetPosts/>    
          </div>     
          </div>
        </div>
        
      
        
      </div>
     </Fragment>
    )
  }
}
  
  export default Home;