import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="./">Hair Stylers</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="./">Home</Nav.Link>
          <Nav.Link href="features">Features</Nav.Link>
          <Nav.Link href="calendar">Calendar</Nav.Link>
          <Nav.Link href="login">Log In</Nav.Link>
          <NavDropdown title="HairStyles" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Long</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Short</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Medium</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Extra</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar>
    );
  }
}

export default NavBar;
