import { useState, useEffect } from "react"
import Map from "./Map"
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, 
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc, Timestamp,
} from 'firebase/firestore'
import Modal from 'react-bootstrap/Modal'
import LevelSelector from "./LevelSelector"
import FlagSelector from "./FlagSelector"
import GameWon from "./GameWon"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { hashString } from 'react-hash-string'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Play = (props) => {

    //? welcome and level selector modal
    const [modalShow, setModalShow] = useState(true);
    const [levelSelectError, setLevelSelectError] = useState('')

    //? flag selector modal
    const [showFlagSelector, setShowFlagSelector] = useState(false)
    const [clickedCountry, setClickedCountry] = useState(['',''])

    //? game won modal
    const [showGameWon, setShowGameWon] = useState(false)

    
    //? Notification Toast *
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
    //? Notification Toast **

    //console.log(props.allLevels)

    const [matched, setMatched] = useState(0);
    const [matchedArr, setMatchedArr] = useState([]);
    const [remaining, setRemaining] = useState([]);
    const [selError, setSelError] = useState(0)
    const [currentLevel, setCurrentLevel] = useState('')
     
    const solutions = props.sols
 
    // RU           US          BR          AR          CN          CA          JP
    // 687309205, -154234357, 204603375, -1538206991, -1602600987, -255246965, -512822949
    //
    // DE           UA          IN          MX          ES          SE          TR
    // 742610833, 1050568551, 264326617, -1069264283, 2025570859, 1114962547, 1510418891
    //
    // SA           IS          MN          MG          CU          CO          AO
    // 1859915115, 406877731, -1354366511, 1023042307, 314957491, -715097305, 94249259
    //
    const [startTime, setStartTime] = useState({})
    const [timeToComplete, setTimetoComplete] = useState({})
    
    // *start game after level selection

    const onGo = (level) => {
        if (!level) {
            setLevelSelectError('To Continue, please select a level')
            return
        }
        else {
            setStartTime(Timestamp.now()) 
            setModalShow(false)
            setRemaining(props.allLevels[level])
            setCurrentLevel(level)
        }
    }
    
    //? country click opens flag selector
    const handleCountryClick = (country) => {
      if(matchedArr.indexOf(country.target.id) !== -1) {
        return
      }
      else {
        setShowFlagSelector(true)
        setClickedCountry([country.target.id, country.target])
        document.getElementById(country.target.id).style.fill='#0ABAB5'
      }
        
    } 

    const hideFlagSelector = () => {
        setShowFlagSelector(false)
        document.getElementById(clickedCountry[0]).style.fill=''
    }

    //? determine is user selection is correct/incorrect
    const playRound = (flag, country)=> { 
        const userSelection = hashString(flag+country);
        if(solutions.indexOf(userSelection) !== -1) {  // * Correct user selection
            document.getElementById(country).style.fill='green'
            setShowFlagSelector(false)
            const newRemaining = remaining.filter((item)=>item !== country)
            setRemaining(newRemaining)
            setMatchedArr([...matchedArr,country])
            notifyCorrect();
              if (matched === 6){ // * When all found   
                  gameWon()
              }
            setMatched(matched + 1)
        }
        else { // * Incorrect user selection
            notifyIncorrect()
            setSelError(selError + 1)
        }
    }   

    
    const gameWon = () => { //^ TODO
        const fTime = Timestamp.now()
        const timeDiff = fTime.seconds-startTime.seconds
        const diffToDisplay = new Date(timeDiff * 1000).toISOString().substring(14, 19)
        setTimetoComplete(diffToDisplay);
        setShowGameWon(true)
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

            <GameWon
                time={timeToComplete}
                wonLevel={currentLevel}
                userErrors={selError}
                show={showGameWon}
                onHide={() => setShowGameWon(false)}
                
            />
            
            <FlagSelector 
                flagclick={playRound}
                show={showFlagSelector}
                country={clickedCountry}
                flags={remaining}
                onHide={() => {hideFlagSelector()}}
            />
            <Map countryClick={handleCountryClick}></Map>
        </div>
    )
}

export default Play