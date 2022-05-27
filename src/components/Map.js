import {
    getFirestore, collection, onSnapshot,
    addDoc, doc, 
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc,
  } from 'firebase/firestore'