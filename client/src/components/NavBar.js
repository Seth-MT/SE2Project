import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import  HairStylersLogo from "./homepageimages/HairStylersLogo.png"
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
  const [searchInput, setInput] = useState("");



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

  const onChange = (e) =>
    setInput(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try{
      const body = {searchInput};

      const res = await fetch("/styles/search/", {
        method: "GET",
        body : JSON.stringify(body),


      })
    }catch (err) {
      console.error(err.message);
    }
  
  }

  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" bg="dark" variant="dark">
      <Navbar.Brand href="/"><Image src={HairStylersLogo} height={40}/></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/posts">Posts</Nav.Link>
          <Nav.Link href="/calendar">Calendar</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/hairstyles">Hairstyles</Nav.Link>
          <Nav.Link href="/ARCamera">Camera & AR Photo</Nav.Link>
        </Nav>
        <Form  onSubmit={onSubmit} inline className="ml-auto">
          <FormControl 
          value={searchInput}
          onChange={(e) => onChange(e)} 
           type="text" 
           placeholder="Search" 
           className="mr-sm-2"/>
          <Button type="submit" variant="outline-light">Search</Button>
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
