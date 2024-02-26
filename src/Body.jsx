import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import React from "react";
import { useState, useEffect } from "react";
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
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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

export default function Body(props) {
  const [formData, setFormData] = React.useState({
    name: "",
    comment: "",
  });
  const [postsString, setPostsString] = React.useState("");

  useEffect(() => {
    function getInitialPosts() {
      onSnapshot(
        query(collection(db, "comments"), orderBy("createdAt", "desc")),
        (querySnapshot) => {
          setPostsString("");
          querySnapshot.forEach((doc) => {
            if (props.id === doc.data().postId) {
              setPostsString(
                (prevPost) =>
                  prevPost +
                  doc.data().comment +
                  " - " +
                  doc.data().name +
                  "\n" +
                  displayDate(doc.data().createdAt) +
                  "\n\n"
              );
            }
          });
        }
      );
    }
    getInitialPosts();
  }, []);

  function displayDate(firebaseDate) {
    if (!firebaseDate) {
      return "Date processing";
    }
    const date = firebaseDate.toDate();
    const day = date.getDate();
    const year = date.getFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let AMorPM = hours > 11 ? "PM" : "AM";
    hours = hours > 12 ? hours - 12 : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${month} ${day}, ${year} @ ${hours}:${minutes}${AMorPM}`;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const { name, comment } = formData;
    try {
      const docRef = await addDoc(collection(db, "comments"), {
        name: auth.currentUser.displayName,
        comment,
        createdAt: serverTimestamp(),
        postId: props.id,
      });
      console.log("Document written with ID: ", docRef.id);
      setFormData({
        name: "",
        comment: "",
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  const mainAddDark = ["main", props.darkMode ? "darkMode" : ""].join(" ");

  let commentSubmitField = (
    <>
      <h4>Login to leave a comment!</h4>
      <hr />
      <br />
    </>
  );
  if (props.signedIn) {
    commentSubmitField = (
      <form
        className="comment-submit-field"
        id="stoneComment"
        onSubmit={handleSubmit}
      >
        <textarea
          id="idComment"
          className={props.darkMode ? "darkMode" : ""}
          value={formData.comment}
          placeholder="Comment"
          onChange={handleChange}
          name="comment"
          autoComplete="off"
          required
        />
        <button className={props.darkMode ? "darkMode" : ""}>Submit</button>
      </form>
    );
  }

  return (
    <div className={mainAddDark}>
      <h3>{props.stone.title}</h3>
      <p className="main-stats">
        {props.stone.date}{" "}
        {props.stone.length && props.stone.weight && (
          <span>
            ({props.stone.length}, {props.stone.weight})
          </span>
        )}
      </p>
      <p className="main-description">{props.stone.description}</p>
      <img className="main-img-stone" src={props.stone.imageUrl} alt="" />
      <div className="like-comment">
        {/* <div className="like">
          <p>
            <i className="fa-regular fa-thumbs-up"></i> Likes:{" "}
            {props.stone.likes}{" "}
          </p>
        </div> */}
        <div className="comment">
          {commentSubmitField}
          {/* {formData.comment && <p>{`${formData.name}: ${formData.comment}`}</p>} */}
          <div className="display-linebreak">{postsString}</div>
        </div>
      </div>
    </div>
  );
}
