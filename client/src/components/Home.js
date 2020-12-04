//React 
import React, {Component, Fragment, useState} from "react";

//React-bootstrap & bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
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

//place holder for newsfeed posts
function Feed(){
  return(
    <Alert variant="danger">Nothing has been posted!</Alert>
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
            <Feed/>         
          </div>
        </div>
        
      
        
      </div>
     </Fragment>
    )
  }
}
  
  export default Home;