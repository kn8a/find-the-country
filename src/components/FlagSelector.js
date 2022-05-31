import { useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap'

import ReactCountryFlag from "react-country-flag"
import { hover } from '@testing-library/user-event/dist/hover';
import '../styles/flags.css'

function FlagSelector(props) {

  
    //console.log(props.country)
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Select the Flag 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='flags'>
              {props.flags.map((flag) => {
                  return(
                      <button 
                        id={flag + 'btn'}
                        onClick={()=>{props.flagclick(flag + '-btn',props.country[0])}}
                      >
                        <ReactCountryFlag 
                        countryCode={flag}
                        svg
                        style={{
                          fontSize: '5em',
                        }}
                        />
                      </button>
                  ) 
              })}
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  export default FlagSelector;