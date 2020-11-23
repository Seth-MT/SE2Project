
import React, {Component} from "react";
import {Fragment} from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


const slideImages = ['https://www.lifewire.com/thmb/_Kwbk6Eien6Bn0Kr1FM1NKvA6pQ=/1002x564/smart/filters:no_upscale()/jpg-files-591e000b5f9b58f4c0912446.png',
'https://cdn.shopify.com/s/files/1/0066/0052/files/How_to_take_care_of_long_hair_-_Luxy_Hair_Blog_grande.jpg?v=1484343521', 
'https://post.healthline.com/wp-content/uploads/2019/09/girl-covering-her-face-with-her-hair-732x549-thumbnail.jpg'

];
 

class Home extends Component {
  render() {
    return( 
      <Fragment>
      <h1>Welcome to the Hair Thing</h1>
      <div className="slide-container">
        <Slide>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
              <span>Slide 1</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
              <span>Slide 2</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
              <span>Slide 3</span>
            </div>
          </div>
        </Slide>
      </div>
      </Fragment>
    
    )
  }
}




export default Home;
