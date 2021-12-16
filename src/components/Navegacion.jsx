import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Figure, Form, FormControl, Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';


const Navegacion = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                    <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
                        Iservi</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                        type="search"
                        placeholder="Buscar"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Buscar</Button>
                    </Form>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
                <Figure>
  <Figure.Image
    width={1400}
    height={180}
    alt="171x180"
    src="./BannerOpt.gif"
  />
  
</Figure>
               
                
                
                
        </div>
    );
}

export default Navegacion;
