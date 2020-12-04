//React 
import React, {Component, Fragment, useState, useEffect} from "react";
import image1 from './homepageimages/1.jpg'
import image2 from './homepageimages/2.jpg'
import image3 from './homepageimages/3.jpg'
import image4 from './homepageimages/4.jpg'


//React-bootstrap & bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'

import GetPosts from './GetPosts'
import PullProducts from './PullProducts'
import PullHairstyles from './PullHairstyles'

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Calendar from 'react-calendar';
import ApiCalendar from 'react-google-calendar-api';


//Function for Carousel at the top of page
//Currently only contains placeholder text and images
function WelcomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  
  const hStyle1 = { color: 'white' };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <a href='/'>
        <img
          brightness ={500}
          opacity = {0}
          width={400} height={400} 
          className="a-block w-100"
          src={image1}
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
            width={400} height={400} 
            className="d-block w-100"
            src={image2}
            alt="Second slide"
          />
        </a>

        <Carousel.Caption>
          <h3><a href='/products' style={hStyle1}><u>Hair Care Products</u></a></h3>
          <p><b>Hair Stylers Recommended Products</b></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <a href='/posts'>
          <img
            width={400} height={400} 
            className="d-block w-100"
            src={image3}
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
            width={400} height={400} 
            className="d-block w-100"
            src={image4}
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

  var hairstyleInventory = []
  hairstyleInventory = PullHairstyles()
  console.log(hairstyleInventory)
  return(
    <CardDeck>
    {hairstyleInventory.slice(5,6).map(function (style){
      return (
        <Card 
          border='light' 
          style={{ width: '18rem' }}
          text='light'
          bg='dark'>

          <Card.Header>Featured Hairstyle</Card.Header>

          <a href = '/hairstyles'>
          <Card.Img alt="Featured Hairstyle" variant="top" src={style.imageUrl}
           />
           </a>

          <Card.Body>
            <Card.Title><a href='/hairstyles'>{style.name}</a></Card.Title>       
            <Card.Text>
              <b>Hair Length:</b> <i>{style.hairLength}</i>
            </Card.Text>
  
          </Card.Body>

        </Card>
  );})}</CardDeck>
  )
}

//function for Featured Products
function FeaturedProducts(){

  var {productInventory} = []
  productInventory = PullProducts()

  var shampoo = productInventory.filter(product => product.type === "Shampoo")
  var conditioner = productInventory.filter(product => product.type === "Conditioner")
  var other = productInventory.filter(product => product.type === ("Oil"))
  
  return (
    <CardDeck>

      {shampoo.slice(0,1).map(function (product) {
          return (
             <Card 
                border='light' 
                style={{ width: '18rem' }}
                text='light'
                bg='dark'
                key = {product.id}>
                  <Card.Header>Shampoo</Card.Header>
                  <a href='/products/{product.id}'><Card.Img variant="top" src={product.imageUrl}
                  height={200} width={200} /></a>
                 <Card.Body>
                    <Card.Title><a href='/products/{product.id}'><u>{product.name}</u></a></Card.Title>
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                    
                  </Card.Body>
              </Card>
               
            );
        })}
        {conditioner.slice(0,1).map(function (product) {
          return (
             <Card 
                border='light' 
                style={{ width: '18rem' }}
                text='light'
                bg='dark'
                key = {product.id}>
               
                  <Card.Header>Conditioner</Card.Header>
                  <a href='/products/{product.id}'><Card.Img variant="top" src={product.imageUrl}
                  height={200} width={200} /></a>
                 <Card.Body>
                    <Card.Title><a href='/products/{product.id}'><u>{product.name}</u></a></Card.Title>
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                    
                  </Card.Body>
              </Card>
               
            );
        })}
        {other.slice(0,1).map(function (product) {
          return (
             <Card 
                border='light' 
                style={{ width: '18rem' }}
                text='light'
                bg='dark'
                key = {product.id}>
                  <Card.Header><a href='/products' style={{color:'white'}}>More...</a></Card.Header>
                  <a href='/products/{product.id}'><Card.Img variant="top" src={product.imageUrl}
                  height={200} width={200} /></a>
                 <Card.Body>
                    <Card.Title><a href='/products/{product.id}'><u>{product.name}</u></a></Card.Title>
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                    
                  </Card.Body>
              </Card>
               
            );
        })}
      
     
      
    </CardDeck>
  );
}



//placeholder for Matthew's Calendar
function CalendarPlaceholder(){

  var tileClassName=({ date, view }) => {
    if(Home.allEvents(Home.events, date)) {
      return 'highlight'
    }
  }

  return(
    <Card 
        border='light' 
        style={{ width: '18rem' }}
        text='light'
        bg='dark' >
        <Card.Header>Calendar</Card.Header>
        <Card.Body>
          <Card.Title>
          </Card.Title>
          <div className="homeCalendar">
            <Calendar
              tileClassName = {tileClassName} >
              </Calendar>
            </div>
        </Card.Body>
      </Card>

  )
}

class Home extends Component {

  constructor(props) {
    super();
    this.state = {
      sign: ApiCalendar.sign //Boolean value that is set to true if user is signed in to Google Calendar and false if not
    };
    this.signUpdate = this.signUpdate.bind(this);
    ApiCalendar.onLoad(() => { //Function is called when the API is loaded
      ApiCalendar.listenSign(this.signUpdate); //Checks if user is signed in to Google Calendar
      if (ApiCalendar.sign) { //Set visibility of log in/log out buttons depending on if the user is signed in or not
        this.getEventDays();
      }
    });
  }

  events = [[],[],[]];

  signUpdate(sign) {
    this.setState({ //Sets sign state to true if user is signed in and false if not
      sign,
    })
    window.location.reload(); //Refresh the page
  }

  async getEventDays () { //Function used to retrieve the events on the user's Google Calendar
    var j=0;
    if (ApiCalendar.sign) { //If the user is signed into Google Calendar
      const response = await ApiCalendar.listUpcomingEvents(100); //Retrieve the next 100 events
      var result = response.result; //Result of the API call
      for (var i=0; i<result.items.length; i++) { //Loops through the list of upcoming events
        var eventDate = (new Date(Date.parse(result.items[i].start.dateTime))); //Convert dateTime object to Date object
        if (result.items[i].summary.substring(0, 10) === "Hair Thing") { //If the event begins with "Hair Thing"
          if (!this.events[j]) { //Initialise array, this is necessary for multidimensional arrays in JavaScript
            this.events[j] = []
          }
          this.events[j][0] = eventDate.getDate(); //Store day value
          this.events[j][1] = eventDate.getMonth(); //Store month value
          this.events[j][2] = eventDate.getFullYear(); //Store year value
          j++; 
        }
      }
      this.setState ({ //Let the app know that the API is finished loading and is now allowed to render the component
        loading: false,
      });
    }
    else {
      console.log("Not signed in");
    }
  }

  allEvents(events, date) { //Function to mark days where an event is on
    for (var i=0; i<this.events.length; i++) {
      if(date.getDate() === this.events[i][0] && date.getMonth() === this.events[i][1] && date.getFullYear() === this.events[i][2]) //If the calendar tile is a day that an event is on
        return true;
    }
    return false;
  }

  render() {

    var tileClassName=({ date, view }) => {
      if(this.allEvents(this.events, date)) {
        return 'highlight'
      }
    }

    return( 
     <Fragment>
      <div class="container-fluid home-page-background">

        <div class="container">
          <div class="row">
           <div class="col-md-8">
             <p></p>
             <WelcomeCarousel/>
           </div>
           <div class="col-md-3">
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
            <div class="card" border='light' style={{ width: '18rem'}} text='light' >
            <div class="card-header bg-dark">
              Calendar
            </div>
            <div class="card-body">
              <div className="homeCalendar">
                <Calendar
                  tileClassName = {tileClassName} >
                </Calendar>
              </div>
            </div>
            </div>
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