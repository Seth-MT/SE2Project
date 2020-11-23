import React, {Component} from "react";
import {Fragment} from "react"
import { Fade } from 'react-slideshow-image';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-slideshow-image/dist/styles.css';
import '../App.css';



const sliderimages = [
'https://cdn.shopify.com/s/files/1/0066/0052/files/How_to_take_care_of_long_hair_-_Luxy_Hair_Blog_grande.jpg?v=1484343521', 
'https://post.healthline.com/wp-content/uploads/2019/09/girl-covering-her-face-with-her-hair-732x549-thumbnail.jpg'

];


class Home extends Component {
  render() {
    return( 
      <Fragment>
        
        <h1 style={{backgroundColor: "lightblue"}}>Welcome to Hair Stylers(heading goes on first image)</h1>
        <p>CSS needs to be put into the homepage</p>

        <div className="slide-container">
          
          <Fade>
           {sliderimages.map((each, index) => <img key={index} style={{height: "200px", width: "100%"}} src={each}/>)}
          </Fade>

        </div>
        
        <div>

          <div>
            <p style={{backgroundColor: "white"}}></p>
            <h3 style={{backgroundColor: "lightblue"}}>Featured Products</h3>
          </div>

          
          
        </div>
      
      </Fragment>
    
    )
  }
}




export default Home;
