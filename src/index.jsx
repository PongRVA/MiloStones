import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   push,
//   onValue,
// } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// const appSettings = {
//   databaseURL: "https://milostones-ca093-default-rtdb.firebaseio.com/",
// };
// const app = initializeApp(appSettings);
// const database = getDatabase(app);
// const commentsInDB = ref(database, "comments");

/////////////////////////////////////////////////////////////////////////////
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
