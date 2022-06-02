import { useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap'

function GameWon(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Congratulations!!!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>You matched all the flags in the {props.wonLevel} level</h4>
          <p>
            You made {props.userErrors} errors, and your time of completion is {props.time}.
          </p>
          <p>
               
          </p>
          <Form>  
              <div className="mb-3">
                <Form.Label>Your name</Form.Label>
                <Form.Control type="text" id='nameInput' placeholder="Enter your name" required/>
              </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <p style={{color:'darkred', fontWeight:'bold'}}>{props.error}</p>
          <Button id='submitScoreBtn' onClick={()=>{props.onClick(props.wonLevel, props.time, props.userErrors)}}>Submit score</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default GameWon;