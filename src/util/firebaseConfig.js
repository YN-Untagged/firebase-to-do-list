import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDFibESNQlYRQdADuiQuPRe0F5osNmqkME",
  authDomain: "todolist-9bdfb.firebaseapp.com",
  databaseURL: "https://todolist-9bdfb-default-rtdb.firebaseio.com",
  projectId: "todolist-9bdfb",
  storageBucket: "todolist-9bdfb.appspot.com",
  messagingSenderId: "197216422561",
  appId: "1:197216422561:web:60873a4521f306ee14bee0",
  measurementId: "G-MGJM1CDTWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
