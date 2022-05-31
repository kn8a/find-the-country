import { useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap'

function LevelSelector(props) {

  const [radioState,setRadioState] = useState('')
  const handleRadioChange = (e) => {
    setRadioState(e.target.value)
    console.log(e.target.value)
  } //Handling radio level selector

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
            Get ready!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Please select level to play</h4>
          <p>
            Each level has 7 flags that need to be matched with their respective country.
          </p>
          <Form>  
              <div className="mb-3" onChange={handleRadioChange}>
              <Form.Check 
                  type='radio'
                  name='level-Radio'
                  value='easy'
                  id='radioEasy'
                  label='Easy - Popular countries that should be easy to find.'
                />
                <Form.Check 
                  type='radio'
                  name='level-Radio'
                  value='med'
                  id='radioMed'
                  label='Med - Less popular countries that most players should recognize.'
                />
                <Form.Check 
                  type='radio'
                  name='level-Radio'
                  value='hard'
                  id='radioHard'
                  label='Hard - Not so popular countries that may be harder to recognize.'
                />
              </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <p style={{color:'darkred', fontWeight:'bold'}}>{props.error}</p>
          <Button onClick={()=>props.onGo(radioState)}>Go!</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default LevelSelector;