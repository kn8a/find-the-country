import Instructions from "./Instructions";
import Play from "./Play";
import Scores from "./Scores";
import Footer from "./Footer";
import NavigationBar from "./Navigation";
import Map from "./Map";
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/app.css'

import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, onSnapshot,
  addDoc, doc, 
  query, where,
  orderBy, serverTimestamp,
  getDoc, updateDoc, DocumentSnapshot,
} from 'firebase/firestore'
import {
  hashString, 
} from 'react-hash-string'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, Navbar, Button, NavbarBrand } from "react-bootstrap";
import { async } from "@firebase/util";

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
const gameDataRef = collection(db, 'data'); //no use for this collection but will need for SCORES

//levels refs
const levelsRef = doc(db, 'data', process.env.REACT_APP_LEVELS_ID)



function App() {

  const [gameLevels, setGameLevels] = useState({})

  useEffect(() => {
    getDoc(levelsRef)
    .then((doc) => {
    setGameLevels(doc.data())
  })
  .catch((err) => {
    alert(err.message)
  })
  }, [])

  useEffect(() => {
    console.log(gameLevels);
  },[gameLevels])
  

  return (
    <div className="App">
      

      <BrowserRouter>
      <NavigationBar/>
        <Routes>
          <Route index element={<Instructions />} />
          <Route path="/" element={<Instructions />} />
          <Route path="/instructions/" element={<Instructions />} />
          <Route path="/play/" exact element={<Play allLevels={gameLevels.levels}/>}/>
          <Route path="/scores/" exact element={<Scores/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;