import React, {Component} from "react";
import {Fragment} from "react"
import { Fade } from 'react-slideshow-image';

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-slideshow-image/dist/styles.css';
import '../App.css';

/*NEEDS TO SEGREGRATE EACH PART INTO THEIR LITTLE BORDER BOXES
USING HTML, CSS, ETC. */


var sliderimages = [
'https://cdn.shopify.com/s/files/1/0066/0052/files/How_to_take_care_of_long_hair_-_Luxy_Hair_Blog_grande.jpg?v=1484343521', 
'https://post.healthline.com/wp-content/uploads/2019/09/girl-covering-her-face-with-her-hair-732x549-thumbnail.jpg'
];

var hairstyles = [
  'https://www.biography.com/.image/t_share/MTUzMDQ5MDQ5NDIxODQ5NjA3/cardi-b-arrives-at-the-2017-mtv-video-music-awards-at-the-forum-on-august-27-2017-in-inglewood-california-photo-by-gregg-deguire_getty-images-500.jpg'
];


var shampoo = [
  "https://www.amazon.com/Nizoral-Anti-Dandruff-Shampoo-Ketoconazole-Dandruff/dp/B00AINMFAC/ref=zg_bs_11057651_1/134-2332473-2902366?_encoding=UTF8&psc=1&refRID=Q6AZ1NJZBXMNE68ZVGVQ",
  "https://images-na.ssl-images-amazon.com/images/I/81kbcbJ4i9L._AC_UL200_SR200,200_.jpg"
 ];

var conditioner = [
  "https://www.amazon.com/Olaplex-No-5-Bond-Maintenance-Conditioner/dp/B07D37SBHF/ref=zg_bs_11057251_3?_encoding=UTF8&psc=1&refRID=6FAQDVBV2NRS3AVGPQPP",
  "https://images-na.ssl-images-amazon.com/images/I/713hHlHMA%2BL._AC_UL200_SR200,200_.jpg"
];

class Home extends Component {
  render() {
    return( 
      <Fragment>
        
        <h1 style={{backgroundColor: "lightblue"}}>Welcome to Hair Stylers</h1>
        <p style={{backgroundColor: "white"}}>Check Matthew's Layout. HTML,CSS needs to be put into the homepage.
          New/relevant images need be populated on the page. Borderboxes to separate each component with CSS (Featured Products, Hairstyles, etc). Calender needs to be added.</p>
        
          <div className="slide-container">
            
            <Fade>
            {sliderimages.map((each, index) => <img key={index} style={{height: "200px", width: "100%"}} 
            alt={"Curl girl"} src={each}/>)}
            </Fade>

          </div>
        
        
          <div>
            <p style={{backgroundColor: "white"}}></p>
            <h3 style={{backgroundColor: "lightblue"}}>Featured Hairstyles</h3>
            <p style={{backgroundColor: "white"}}></p>
          </div>

          <div>
           <p>Gucci Gucci Hairstyles Bling bling 🤣</p>        
           <a href= {'https://www.youtube.com/watch?v=XmXnO3tpNEo'}>
             <img style={{width:"200px" , height:"200px"}} alt="Cardi b Hairstyle" src={hairstyles[0]} />
             Cardi B does what to her hair? 😲😮😯
           </a>



          <div>
            <p style={{backgroundColor: "white"}}></p>
            <h3 style={{backgroundColor: "lightblue"}}>Featured Products</h3>
            <p style={{backgroundColor: "white"}}></p>
          </div>

          <div>
           <p>Shampoo</p>        
           <a href= {shampoo[0]}>
             <img style={{width:"100px" , height:"100px"}} alt="Nizoral Shampoo" src={shampoo[1]} />
             Nizoral Shampoo
           </a>

           <p> Conditioner</p>
           <a href= {conditioner[0]}>
             <img style={{width:"100px" , height:"100px"}} alt="Olaplex Conditioner" src={conditioner[1]} />
             Olaplex No.5 Bond Maintenance Conditioner
           </a>
          </div> 

          <div>
            <p style={{backgroundColor: "white"}}></p>
            <h3 style={{backgroundColor: "lightblue"}}>Other Hair Stuff</h3>
            <p style={{backgroundColor: "white"}}></p>
          </div>

          <div>
            <p style={{backgroundColor: "white"}}></p>
            <h3 style={{backgroundColor: "pink"}}>Calendar</h3>
            <p style={{backgroundColor: "white"}}></p>
          </div>

        </div>
      
      </Fragment>
    
    )
  }
}




export default Home;
