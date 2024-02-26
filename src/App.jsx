import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import data from "./data";
import "./index.css";

export default function App() {
  //initialize darkMode state, reverse order & signedIn
  const [darkMode, setDarkMode] = React.useState(true);
  const [reverse, setReverse] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(false);

  //handles toggle change and updates darkMode
  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }
  function toggleReverse() {
    setReverse((prevOrder) => !prevOrder);
  }
  function toggleSignedIn() {
    setSignedIn((prevStatus) => !prevStatus);
  }

  const miloStones = data.map((stone) => (
    <Body
      id={stone.id}
      key={stone.id}
      stone={stone}
      darkMode={darkMode}
      signedIn={signedIn}
    />
  ));
  //adds conditional darkMode class to array of strings for className
  const containerAddDark = ["container", darkMode ? "darkMode" : ""].join(" ");
  return (
    <div className={containerAddDark}>
      <Header
        darkMode={darkMode}
        reverse={reverse}
        signedIn={signedIn}
        //pass in prop as function for onClick events
        toggleReverse={toggleReverse}
        toggleDarkMode={toggleDarkMode}
        toggleSignedIn={toggleSignedIn}
      />
      <div className="main--miloStones">
        {reverse ? miloStones : miloStones.reverse()}
      </div>
      <Footer />
    </div>
  );
}
