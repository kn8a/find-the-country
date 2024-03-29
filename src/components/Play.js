import { useState } from "react"
import Map from "./Map"
import { getFirestore, collection, addDoc, Timestamp} from 'firebase/firestore'
import LevelSelector from "./LevelSelector"
import FlagSelector from "./FlagSelector"
import GameWon from "./GameWon"
import { hashString } from 'react-hash-string'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Play = (props) => {

    let navigate = useNavigate();

    //? welcome and level selector modal
    const [modalShow, setModalShow] = useState(true);
    const [levelSelectError, setLevelSelectError] = useState('')

    //? flag selector modal
    const [showFlagSelector, setShowFlagSelector] = useState(false)
    const [clickedCountry, setClickedCountry] = useState(['',''])

    //? game won modal
    const [showGameWon, setShowGameWon] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')
    
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

    const [matched, setMatched] = useState(0);
    const [matchedArr, setMatchedArr] = useState([]);
    const [remaining, setRemaining] = useState([]);
    const [selError, setSelError] = useState(0)
    const [currentLevel, setCurrentLevel] = useState('')
    const solutions = props.sols
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
            props.flagsToNav(props.allLevels[level])
            document.getElementById('remaining-nav-flags').style.display = 'flex'
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
            props.flagsToNav(newRemaining)
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
    
    const gameWon = () => { //* triggered when game is won
        const fTime = Timestamp.now()
        const timeDiff = fTime.seconds-startTime.seconds
        const diffToDisplay = new Date(timeDiff * 1000).toISOString().substring(14, 19)
        setTimetoComplete(diffToDisplay);
        setShowGameWon(true)
        document.getElementById('remaining-nav-flags').style.display = 'none'
    }

    function submitScore (level, time, errors) {
      const db = getFirestore()
      const scoreRef = collection(db, 'scores')
      const name = document.getElementById('nameInput')
      addDoc(scoreRef, {
        level: level,
        time: time,
        errors: errors,
        name: name.value
      })
      .then(()=> {
        name.value = ''
        setShowGameWon(false)
        navigate("/scores");
      })
    }
    
    return (
        
        <div>
            <ToastContainer
          position="top-center"
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
                onClick={submitScore}
                
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