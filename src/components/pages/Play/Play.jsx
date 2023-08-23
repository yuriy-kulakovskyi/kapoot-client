import React, { useState, useRef, useEffect } from 'react';

// connect from redux
import { connect } from 'react-redux';

// useAuth
import { useAuth } from '../../../contexts/AuthContext';

// firebase
import { getDatabase, ref } from "firebase/database";

// styles
import '../../../styles/Play/Play.css';

// Header component
import Header from "../../Header";

// onValue
import { onValue } from "firebase/database";

// Link from react-router-dom
import { Link } from 'react-router-dom';

const Play = ({ language }) => {
  // values from useAuth
  const {
    currentUser
  } = useAuth();

  // name state
  const [name, setName] = useState(currentUser ? currentUser.displayName : "");

  // code state
  const [code, setCode] = useState("");

  // database
  const database = getDatabase();

  // gamesRef
  const gamesRef = useRef();

  // playersRef
  const playersRef = useRef();

  // matched state
  const [matched, setMatched] = useState(false);

  // error state
  const [error, setError] = useState("");

  // isRequired state
  const [isRequired, setIsRequired] = useState(false);

  // isDisabled state
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsRequired(true);

    gamesRef.current = ref(database, "/games");
    playersRef.current = ref(database, "/players");

    onValue(gamesRef.current, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const gameData = Object.values(data);

        // get codes from gameData
        const gameCodes = gameData.map((game) => {
          return game.value.code;
        });

        // check if code is equal to any code in gameCodes
        gameCodes.forEach((gameCode) => {
          if (code === gameCode.toString()) {
            setMatched(true);
          } else {
            setMatched(false)
          }
        });
      }
    });

    // check if name is already in the database
    onValue(playersRef.current, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const playersData = Object.values(data);

        // get names from playersData
        const playersNames = playersData.map((player) => {
          return player.value.name;
        });

        // get games from playersData
        const playersGames = playersData.map((player) => {
          return player.value.game;
        });

        // check if name and game are equal to any name and game
        playersNames.forEach((playerName, index) => {
          if (name === playerName.toString() && code === playersGames[index].toString()) {
            setError(
              language === "en" ? "Name is already taken" : language === "ua" ? "Ім'я вже зайняте" : "Imię jest już zajęte"
            );
            setMatched(false);
            setIsDisabled(true);
            setIsRequired(true);
          } else {
            setError("");
            setIsDisabled(false);
            setMatched(true);
            setIsRequired(true);
          }
        });
        
        
        // playersNames.forEach((playerName) => {
        //   if (name === playerName.toString()) {
        //     setError(
        //       language === "en" ? "Name is already taken" : language === "ua" ? "Ім'я вже зайняте" : "Imię jest już zajęte"
        //     );
        //     setMatched(false);
        //     setIsDisabled(true);
        //     setIsRequired(true);
        //   } else {
        //     setError("");
        //     setIsDisabled(false);
        //     setMatched(true);
        //     setIsRequired(true);
        //   }
        // });
      }
    });
  }, [currentUser, database, gamesRef, code, language, name]);

  const checkCode = () => {
    !matched &&
      setError(
        language === "en" ? "Code is not valid" : language === "ua" ? "Код недійсний" : "Kod jest nieprawidłowy"
      );
  }

  return (
    <section className='play'>
      {/* independent square and circle */}
      <div className='play__square'></div>
      <div className='play__circle'></div>

      {/* header */}
      <Header
        playing={true}
      />

      {/* title */}
      <h1 className='play__title'>Kapoot!</h1>

      <div className="play__box">
        {/* input for name */}
        {isRequired && <input
          type="text"
          value={name}
          placeholder={
            // according to the language, the placeholder will change
            language === "en" ? "Name" : language === "ua" ? "Ім'я" : "Imię"
          }
          onChange={(e) => setName(e.target.value)}
        />}

        {/* input for code */}
        <input
          type="text"
          placeholder={
            // according to the language, the placeholder will change
            language === "en" ? "Code" : language === "ua" ? "Код" : "Kod"
          }
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />

        {/* button which will redirect to the game */}
        {!isDisabled && <Link
          to={matched && "/game"}
          onClick={checkCode}
          className='play__button'
          state={{
            name: name,
            code: code
          }}
        >
          {/* according to the chosen language display text */}
          {language === "en" ? "Play" : language === "ua" ? "Грати" : "Grać"}
        </Link>}
        <div className="play__error">
          {/* according to the chosen language display text */}
          {error}
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  language: state.language
});

export default connect(mapStateToProps)(Play);
