import React from "react";
import PullHairstyles from "./PullHairstyles";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns'


const HairstylesPage = () => {
    
  var hairstyles = PullHairstyles()

    return (
        <div className="container-fluid home-page-background">
          <a href='/products'>
          <h1 style = {{color:'white'}} className="
            text-center products-row-background-colour">
              Hairstyles
          </h1>
          </a>
          <div className="container md-8 border border-light background-white">
            <CardColumns align='center' className='background-color-white'> 
            {hairstyles.map(function (hairstyle) {
              return (
                
                <Card
                border='light' 
                style={{ width: '18rem' }}
                text='light'
                bg='dark'
                                 
                >
                  <Card.Img variant="top" src={hairstyle.imageUrl}
                     style={{width: '100%'}} />
                    
                     <Card.Body>
                       <Card.Title ><a href=''  style={{color:'white'}}>{hairstyle.name}</a></Card.Title>
                       <Card.Text class='text-left'>
                         <b>Type:</b> <i>{hairstyle.type}</i>
                       </Card.Text>
                       <Card.Text class='text-left'>
                         <b>Hair Length:</b> <i>{hairstyle.hairLength}</i>
                       </Card.Text>
                        
                     </Card.Body>
                 
                </Card>
              );
            })}</CardColumns>
            
          </div>  
        </div>
      );
    };

export default HairstylesPage;