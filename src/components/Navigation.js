import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


function NavigationBar() {
    return (
        <Navbar bg="light" expand="lg" variant="light">
            <LinkContainer to="/instructions">
              <Navbar.Brand>Match-D-Flag</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

                <LinkContainer to="/instructions">
                    <Nav.Link>Instructions</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/play">
                    <Nav.Link>Play</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/scores">
                    <Nav.Link>Scores</Nav.Link>
                </LinkContainer>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
);
}
export default NavigationBar;