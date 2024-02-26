import React from "react";
import { useRef, useState } from "react";
import "./index.css";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

/* === Firebase Setup === */
/* IMPORTANT: Replace this with your own firebaseConfig when doing challenges */
const firebaseConfig = {
  apiKey: "AIzaSyB3hFJwms7VvCpaF060L5oMDc88TELzqE8",
  authDomain: "milostones-ca093.firebaseapp.com",
  databaseURL: "https://milostones-ca093-default-rtdb.firebaseio.com",
  projectId: "milostones-ca093",
  storageBucket: "milostones-ca093.appspot.com",
  messagingSenderId: "548769090088",
  appId: "1:548769090088:web:e9762561fce2d3b2edc31d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function Header(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  function handleDisplayNameChange(event) {
    setDisplayName(event.target.value);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function authSignInWithEmail() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail("");
        setPassword("");
        props.toggleSignedIn();
        // updateProfile(auth.currentUser, {
        //   displayName: displayName,
        // });
        alert("You are signed in. Welcome to Milostones!");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  function authCreateAccountWithEmail() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: displayName,
        })
          .then(() => {
            authSignInWithEmail();
          })
          .catch((error) => {
            console.error(error.message);
          });
        setDisplayName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        alert(error.message);
      });
    // authSignInWithEmail();
  }
  function authSignOut() {
    signOut(auth)
      .then(() => {
        props.toggleSignedIn();
        alert("Successfully signed out!");
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  let authField;
  if (!props.signedIn) {
    authField = (
      <div className="auth-fields-and-buttons">
        <input
          onChange={handleDisplayNameChange}
          id="display-name-input"
          type="text"
          placeholder="Display Name"
          required
        />
        <input
          onChange={handleEmailChange}
          id="email-input"
          type="email"
          placeholder="Email"
          required
        />
        <input
          onChange={handlePasswordChange}
          id="password-input"
          type="password"
          placeholder="Password"
          required
        />
        <button
          onClick={authSignInWithEmail}
          id="sign-in-btn"
          className="primary-btn"
        >
          Sign in
        </button>
        <button
          onClick={authCreateAccountWithEmail}
          id="create-account-btn"
          className="secondary-btn"
        >
          Create Account
        </button>
      </div>
    );
  } else {
    authField = (
      <button onClick={authSignOut} id="sign-out-btn" className="primary-btn">
        Sign out
      </button>
    );
  }
  return (
    //adds conditional darkMode class
    <header className={props.darkMode ? "dark" : ""}>
      <h1>Milo ·Stones</h1>
      <div className="reverse-btn-container">
        <button
          className="reverse-btn"
          id="reverse-btn"
          onClick={props.toggleReverse}
        >
          {props.reverse ? "Sort newest -> oldest" : "Sort oldest -> newest"}
        </button>
      </div>

      {authField}

      <div className="toggler--container">
        <p className="toggler--light">Light</p>
        <section
          className={props.darkMode ? "dark" : ""}
          onClick={props.toggleDarkMode}
        ></section>
        <p className="toggler--dark">Dark</p>
      </div>
    </header>
  );
}
