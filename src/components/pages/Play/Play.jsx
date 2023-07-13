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

  useEffect(() => {
    if (currentUser) {
      gamesRef.current = ref(database, "/games");
      setName(currentUser.displayName);
    }
  }, [currentUser, database, gamesRef]);

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
          to={"/game"}
          className='play__button'
          state={{
            name: name,
            code: code
          }}
        >
          {/* according to the chosen language display text */}
          {language === "en" ? "Play" : language === "ua" ? "Грати" : "Grać"}
        </Link>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  language: state.language
});

export default connect(mapStateToProps)(Play);
