import {Modal, Button, Form} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom'
import '../styles/instructions.css'
const Instructions = () => {
    return (
        <div className='inst-back'>
            <div className="instructions">
                <h2>
                    Welcome
                </h2>
                <div>
                    <p>
                        In this game, your goal is to match country flags to their respective country on a map.
                    </p>
                    <p>
                        There is no time limit, but there is a time counter so your goal is to match all flags as quickly as possible.
                    </p>
                    <h4>Gameplay:</h4>
                    <ol>
                        <li>After clicking 'Play', you'll be taken to a level selector.</li>
                        <li>Once you click 'Go', the timer starts.</li>
                        <li>In the top-right corner, you will be given 7 flags to find.</li>
                        <li>Click on any of the countries on the map. (you want to click on countries corresponding to the flags)</li>
                        <li>A flag selection will popup. Select the flag corresponding to the country you clicked.</li>
                        <li>Repeat until all flags have been matched to their respective country.</li>
                    </ol>
                    <img className='demoimg' alt="Find-D-Flag" src="https://firebasestorage.googleapis.com/v0/b/find-the-country-83730.appspot.com/o/Cbbfapture.JPG?alt=media&token=69e8431a-0a6b-46fc-abe2-990249e90bda"></img>
                    <p>Ready to start?</p>
                    <LinkContainer to="/play">
                    <Button>Play</Button>
                    </LinkContainer>
                    
                </div>
            </div>
        </div>
    )
}

export default Instructions