import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBpwsqfFgPoNh7-C81FzZBpWAOqPu63DmU",

  authDomain: "pmdb-75c79.firebaseapp.com",

  projectId: "pmdb-75c79",

  storageBucket: "pmdb-75c79.appspot.com",

  messagingSenderId: "761901107561",

  appId: "1:761901107561:web:2fdeb7571d553f0e9295f8",

  measurementId: "G-LPV6NJJQXR"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


