import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


function NavigationBar() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <LinkContainer to="/instructions">
              <Navbar.Brand>Match-D-Flag</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">

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
                <Nav>
                
                <p>flag</p>
                <p>flag</p>
                <p>flag</p>
                <p>flag</p>
                <p>flag</p>
                <p>flag</p>
                <p>flag</p>
            
                </Nav>
            </Navbar.Collapse>

        </Navbar>
);
}
export default NavigationBar;