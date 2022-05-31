import { useState, useEffect } from "react"
import Map from "./Map"
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, 
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc,
} from 'firebase/firestore'
import Modal from 'react-bootstrap/Modal'
import LevelSelector from "./LevelSelector"
import FlagSelector from "./FlagSelector"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { hashString } from 'react-hash-string'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Play = (props) => {

    // welcome and level selector
    const [modalShow, setModalShow] = useState(true);
    const [levelSelectError, setLevelSelectError] = useState('')

    //flag selector
    const [showFlagSelector, setShowFlagSelector] = useState(false)
    const [clickedCountry, setClickedCountry] = useState(['',''])
    
    //Notification Toast *
    const CorrectAlert = ({ closeToast, toastProps }) => (
        <div className="add-to-cart-alert">
          <div>Correct! Well Done!</div>
        </div>
      );
    const IncorrectAlert = ({ closeToast, toastProps }) => (
        <div className="add-to-cart-alert">
          <div>Incorrect. Try again.</div>
        </div>
      );

    function notifyCorrect() {
        toast.success(<CorrectAlert />);
    }

    function notifyIncorrect() {
        toast.error(<IncorrectAlert />);
    }
    //Notification Toast **

    //console.log(props.allLevels)

    const [matched, setMatched] = useState(0);
    const [remaining, setRemaining] = useState([]);
    const [selError, setSelError] = useState(0)
    const [currentLevel, setCurrentLevel] = ('')
    
    
    
    const solutions = [
        687309205, -154234357, 204603375, -1538206991, -1602600987, -255246965, -512822949,
        742610833, 1050568551, 264326617, -1069264283, 2025570859, 1114962547, 1510418891,
        1859915115, 406877731, -1354366511, 1023042307, 314957491, -715097305, 94249259
    ]
 
    // RU           US          BR          AR          CN          CA          JP
    // 687309205, -154234357, 204603375, -1538206991, -1602600987, -255246965, -512822949
    //
    // DE           UA          IN          MX          ES          SE          TR
    // 742610833, 1050568551, 264326617, -1069264283, 2025570859, 1114962547, 1510418891
    //
    // SA           IS          MN          MG          CU          CO          AO
    // 1859915115, 406877731, -1354366511, 1023042307, 314957491, -715097305, 94249259
    //
    //stopwatch states
    //! figure out stopwatch - time lapsed
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    
    function Stopwatch(){
        useEffect(() => {
          let interval;
          if (running) {
            interval = setInterval(() => {
              setTime((prevTime) => prevTime + 10);
            }, 10);
          } else if (!running) {
            clearInterval(interval);
          }
          return () => clearInterval(interval);
        }, [running]);
        return (
          <div className="stopwatch">
            <div className="numbers">
              <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
              <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
              <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
            <div className="buttons">
              <button onClick={() => setRunning(true)}>Start</button>
              <button onClick={() => setRunning(false)}>Stop</button>
              <button onClick={() => setTime(0)}>Reset</button>       
            </div>
          </div>
        );
      };

    // *start game after level selection
    const onGo = (level) => {
        if (!level) {
            setLevelSelectError('To Continue, please select a level')
            return
        }
        else {
            setModalShow(false)
        //console.log(level)
            setRemaining(props.allLevels[level])
            setCurrentLevel(level)
            setRunning(true)
        //console.log(props.allLevels[level])
        }
    }
    
    const handleCountryClick = (country) => {
        setShowFlagSelector(true)
        setClickedCountry([country.target.id, country.target])
        document.getElementById(country.target.id).style.fill='#0ABAB5'
    } //country click opens flag selector

    const hideFlagSelector = () => {
        setShowFlagSelector(false)
        document.getElementById(clickedCountry[0]).style.fill=''
    }

    const playRound = (flag, country)=> {
        const userSelection = hashString(flag+country);
        if(solutions.indexOf(userSelection) !== -1) {  // * Correct user selection
            //console.log('FOUND')
            document.getElementById(country).style.fill='green'
            setShowFlagSelector(false)
            const newRemaining = remaining.filter((item)=>item !== country)
            setRemaining(newRemaining)
            notifyCorrect();
             if (matched === 6){ // * When all found
                 console.log('You found ALL')
                 gameWon()
             }
            setMatched(matched + 1)
        }
        else { // * Incorrect user selection
            notifyIncorrect()
            setSelError(selError + 1)
        }
    }   //determine is user selection is correct/incorrect

    
    const gameWon = () => { //^ TODO
        setRunning(false)
    }


    return (
        
        <div>
            <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
            <LevelSelector
                onGo={onGo}
                show={modalShow}
                onHide={() => setModalShow(false)}
                error={levelSelectError}
            />
            
            <FlagSelector 
                flagclick={playRound}
                show={showFlagSelector}
                country={clickedCountry}
                flags={remaining}
                onHide={() => {hideFlagSelector()}}
            />
            <Stopwatch></Stopwatch>
            <Map countryClick={handleCountryClick}></Map>
        </div>
    )
}

export default Play