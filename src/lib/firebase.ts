import { initializeApp } from "firebase/app";
import { getAuth, TwitterAuthProvider } from "firebase/auth";

export const app = initializeApp({
  apiKey: "AIzaSyA6POCcghC8moGzG4FiTzlnMV6ExmlTwIs",
  authDomain: "gadget-app-c4c5a.firebaseapp.com",
  projectId: "gadget-app-c4c5a",
  storageBucket: "gadget-app-c4c5a.appspot.com",
  messagingSenderId: "747925985101",
  appId: "1:747925985101:web:53f7cbedc8bd769d8d4904",
  measurementId: "G-ZCFT9RQEVH",
});

export const provider = new TwitterAuthProvider();
export const auth = getAuth();
