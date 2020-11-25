import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Image } from "react-bootstrap";

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const NavBar = ({ user }) => {
  const [name, setName] = useState("");
  const [profileImage, setImage] = useState("");

  const getUser = async () => {
    try {
      const res = await fetch("/profile/", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setName(parseData.userName);
      setImage(parseData.profileImage);
    } catch (err) {
      console.error(err.message);
    }
  };

  const navDropdownTitle = (
    <span>
      {" "}
      <Image
        src={profileImage}
        roundedCircle
        width={20}
        height={29}
        alt="Profile Image"
      />{" "}
      {name}{" "}
    </span>
  );
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" bg="dark" variant="dark">
      <Navbar.Brand href="/">Hair Stylers</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/posts">Posts</Nav.Link>
          <Nav.Link href="/calendar">Calendar</Nav.Link>
          <NavDropdown title="HairStyles" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Long</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Short</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Medium</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Extra</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline className="ml-auto">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
        {!user ? (
          <Nav.Link href="login">Log In</Nav.Link>
        ) : (
          (getUser(),
          (
            <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown">
              <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
            </NavDropdown>
          ))
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
