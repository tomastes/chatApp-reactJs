import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDI68OSF9BephHljkODqS72cgebzIpEXYg",
  authDomain: "chat-app-8894e.firebaseapp.com",
  databaseURL: "https://chat-app-8894e.firebaseio.com",
  projectId: "chat-app-8894e",
  storageBucket: "chat-app-8894e.appspot.com",
  messagingSenderId: "244982545472",
  appId: "1:244982545472:web:7dc8c43bbf1d2395d3b3a5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

const analytics = firebase.analytics();
export { auth, firestore,analytics };
