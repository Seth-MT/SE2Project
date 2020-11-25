//React 
import React, {Component, Fragment, useState} from "react";

//React-bootstrap & bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'


//Function for Carousel at the top of page
//Currently only contains placeholder text and images
function WelcomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          width={400} height={350} 
          className="a-block w-100"
          src="https://peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h1><a href=''>Welcome to Hair Stylers</a></h1>
          <p>Description here.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          width={400} height={350} 
          className="d-block w-100"
          src="https://peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3><a href=''>Second slide label</a></h3>
          <p>Description here.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          width={400} height={350} 
          className="d-block w-100"
          src="https://peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3><a href=''>Third slide label</a></h3>
          <p>Description here.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          width={400} height={350} 
          className="d-block w-100"
          src="https://peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3><a href=''>Fourth slide label</a></h3>
          <p>Description here.</p>
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
  return (
    <CardDeck>
      <Card 
        border='light' 
        style={{ width: '18rem' }}
        text='light'
        bg='dark'>
        <Card.Header>Shampoo</Card.Header>
        <Card.Img variant="top" src="https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png"
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

//place holder for newsfeed posts
function Feed(){
  return(
    <Alert variant="danger">Nothing has been posted!</Alert>
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
              <h5>Featured Products</h5>
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
              <h5>News Feed</h5>
            </div>
          </div>

          <div class="row"> 
            <Feed/>         
          </div>
        </div>
        
      
        
      </div>
      </Fragment>
    )
  }
}
  
  export default Home;