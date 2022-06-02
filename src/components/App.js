import Instructions from "./Instructions";
import Play from "./Play";
import Scores from "./Scores";
import Footer from "./Footer";
import NavigationBar from "./Navigation";
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/app.css'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, doc, query, orderBy, getDoc } from 'firebase/firestore'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);
const db = getFirestore()
const scoreRef = collection(db, 'scores'); //scores ref
const levelsRef = doc(db, 'data', process.env.REACT_APP_LEVELS_ID) //levels ref

function App() {
  const [gameLevels, setGameLevels] = useState({})
  const [scoresState, setScoresState] = useState([])
  const scoresQ = query(scoreRef, orderBy('time'))
  
  useEffect(()=> { //get and update scores
      onSnapshot(scoresQ, (snapshot) => {  
          let scores=[]
          snapshot.docs.forEach((doc) => {
              scores.push({...doc.data(), id: doc.id})
              setScoresState(scores)
            })})
    },[])

  useEffect(() => { //get game levels
    getDoc(levelsRef)
    .then((doc) => {
    setGameLevels(doc.data())
  })
  .catch((err) => {
    alert(err.message)
  })
  }, [])
  
  const [flagsRemaining, setFlagsRemaining] = useState([]) //for use with Nav flag display

  const flagsToNav = (remaining) => { //flags from game to Nav
    setFlagsRemaining(remaining)
  }

  return (
    <div className="App">
      <BrowserRouter>
      <NavigationBar flags={flagsRemaining}/>
        <Routes>
          <Route index element={<Instructions />} />
          <Route path="/" element={<Instructions />} />
          <Route path="/instructions/" element={<Instructions />} />
          <Route path="/play/" exact element={<Play allLevels={gameLevels.levels} flagsToNav={flagsToNav} sols={gameLevels.sols}/>} />
          <Route path="/scores/" exact element={<Scores scores={scoresState}/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
