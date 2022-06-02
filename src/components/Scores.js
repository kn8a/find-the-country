import ScoreTabs from "./ScoreTabs"
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, 
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc, Timestamp
} from 'firebase/firestore'
import { useEffect, useState } from "react"


        //where('level', '==', 'easy')

const Scores = (props) => {
    const [scoresState, setScoresState] = useState([])

    const db = getFirestore()
    const scoreRef = collection(db, 'scores')
    const scoresQ = query(scoreRef, orderBy('time'))
    
   

    useEffect(()=> {
        onSnapshot(scoresQ, (snapshot) => {  
            let scores=[]
            snapshot.docs.forEach((doc) => {
                scores.push({...doc.data(), id: doc.id})
                setScoresState(scores)
                console.log(scoresState, scores)
            })})
    },[])


    return (
        <ScoreTabs scores={scoresState}></ScoreTabs>
    )
}

export default Scores