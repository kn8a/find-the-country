import React from 'react';
import { Navbar, Nav, NavItem, Form, FormControl, Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ReactCountryFlag from "react-country-flag"
import '../styles/nav.css'


function NavigationBar(props) {

    function hideFlags() {
        document.getElementById('remaining-nav-flags').style.display = 'none'
    }


    return (
        <Navbar bg="dark" expand="lg" variant="dark" >
            <Container fluid>
            <LinkContainer to="/instructions">
              <Navbar.Brand onClick={()=>hideFlags()}>Match-D-Flag</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbarScroll"  />
            <Navbar.Collapse id="navbarScroll">
            <Nav 
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
                onClick={()=>hideFlags()}
                >
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
      <div className='menu-flags-div' id='remaining-nav-flags'>
          <div>Find: </div>
            {props.flags.map((flag) => {
                  return(
                        <ReactCountryFlag
                        key={'GDE'+flag+'SPTU'} 
                        countryCode={flag}
                        svg
                        style={{
                          fontSize: '3em',
                        }}
                        />
                  ) 
              })}
      </div>
    </Navbar.Collapse>
  </Container>
        </Navbar>
);
}
export default NavigationBar;