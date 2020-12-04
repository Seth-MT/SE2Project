//React
import React, { Component } from "react";
import "../AR.css";
import $ from "jquery";
import galaxy from "./thumbs/galaxy.png";
import aviators from "./thumbs/aviators.png";
import beard from "./thumbs/beard.png";
//React bootstrap & bootstrap
// import Alert from 'react-bootstrap/Alert'

class AR_Camera extends Component {
  componentDidMount = () => {};
  render() {
    return (
      // <Alert variant="danger">Camera has not been found</Alert>
      <div className="container">
        <canvas
          class="deepar"
          id="deepar-canvas"
          oncontextmenu="event.preventDefault()"
        ></canvas>
        <div id="loader-wrapper">
          <span class="loader"></span>
        </div>
        <div class="effect-carousel">
          <div>
            <img class="thumb" src={galaxy} />
          </div>
          <div>
            <img class="thumb" src={aviators} />
          </div>
          <div>
            <img class="thumb" src={beard} />
          </div>
          <div>
            <img class="thumb" src="../thumbs/dalmatian.png" />
          </div>
          <div>
            <img class="thumb" src="../thumbs/flowers.png" />
          </div>
          <div>
            <img class="thumb" src="../thumbs/koala.png" />
          </div>
          <div>
            <img class="thumb" src="../thumbs/lion.png" />
          </div>
          <div>
            <img class="thumb" src="../thumbs/teddy_cigar.png" />
          </div>
        </div>
      </div>
    );
  }
}

export default AR_Camera;
