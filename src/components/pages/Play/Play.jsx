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

// push from firebase
import { push } from "firebase/database";

// Link from react-router-dom
import { Link } from 'react-router-dom';

const Play = ({ language }) => {
  // name state
  const [name, setName] = useState("");

  // code state
  const [code, setCode] = useState("");

  // values from useAuth
  const {
    currentUser
  } = useAuth();

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

  useEffect(() => {
    if (currentUser) {
      gamesRef.current = ref(database, "/games");
      setName(currentUser.displayName);

      playersRef.current = ref(database, "/players");
    }

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
  }, [currentUser, database, gamesRef, code]);

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
        <input
          type="text"
          placeholder = {
            // according to the language, the placeholder will change
            language === "en" ? "Code" : language === "ua" ? "Код" : "Kod"
          }
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />

        {/* button which will redirect to the game */}
        <Link 
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
        </Link>
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
