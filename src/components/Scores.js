import ScoreTabs from "./ScoreTabs"
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, 
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc, Timestamp
} from 'firebase/firestore'


        //where('level', '==', 'easy')

const Scores = (props) => {

    const db = getFirestore()
    const scoreRef = collection(db, 'scores')

    const easyQ = query(scoreRef, orderBy('time'))

    const unsubCol = onSnapshot(easyQ, (snapshot) => {
    let easy = [];
    snapshot.docs.forEach((doc) => {
        easy.push({...doc.data(), id: doc.id})
    })
        console.log(easy)
    })
    return (
        <ScoreTabs></ScoreTabs>
    )
}

export default Scores