
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyAjIATIFlP3cg8P7mqvXNy0xY9gfy1eNQo",
  authDomain: "nutrias-equilibrio.firebaseapp.com",
  databaseURL: "https://nutrias-equilibrio-default-rtdb.firebaseio.com",
  projectId: "nutrias-equilibrio",
  storageBucket: "nutrias-equilibrio.firebasestorage.app",
  messagingSenderId: "365322544392",
  appId: "1:365322544392:web:75ff00aaa0cba72985f8bd"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
