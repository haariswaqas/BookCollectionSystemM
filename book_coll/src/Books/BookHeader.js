import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav} from 'react-bootstrap'; // Import Navbar, Nav, and Button from Bootstrap

const BookHeader = () => {
  return (
    <Navbar bg="danger" expand="lg" variant="dark">
      <Navbar.Brand href="/"> The Literature Lounge</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/" className="text-light">Books</Nav.Link>
          <Nav.Link href="/genres" className="text-light">Genres</Nav.Link>
          <Nav.Link href="/addBook" className="text-light">Add Book</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default BookHeader;
