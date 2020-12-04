//React
import React, {Component} from "react"

//React bootstrap & bootstrap
import Alert from 'react-bootstrap/Alert'

//camera code causing brick, camera not implemented

class AR_Camera extends Component{

    render(){
        return(
            
            <Alert variant="danger">Camera has not been found</Alert>
                  
        )
    }
    
}

export default AR_Camera;