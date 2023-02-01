// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsiEaTZFG7S4i7B7nGmzosSYFHb5BKUZk",
  authDomain: "luxemarket-ce929.firebaseapp.com",
  projectId: "luxemarket-ce929",
  storageBucket: "luxemarket-ce929.appspot.com",
  messagingSenderId: "334719878544",
  appId: "1:334719878544:web:b22267e98ab2ca04b8df15",
  measurementId: "G-BZZKMNFDHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;