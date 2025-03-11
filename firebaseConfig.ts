import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getMessaging } from "firebase/messaging"; 

const firebaseConfig = {
  apiKey: "AIzaSyB1SLHbcGnlFp13IzjoUxUxnZfQ4VgFMNQ",
  authDomain: "fir-9-testing-5a606.firebaseapp.com",
  projectId: "fir-9-testing-5a606",
  storageBucket: "fir-9-testing-5a606.firebasestorage.app",
  messagingSenderId: "1066059029663",
  appId: "1:1066059029663:web:4f222734019b26389556aa",
  databaseURL: "https://fir-9-testing-5a606-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);


// ✅ Initialize messaging only if running in a browser
let messaging: any = null;
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  messaging = getMessaging(app);
}

export { 
  app, 
  database, 
  ref, 
  push, 
  onValue, 
  set, messaging, 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
};
