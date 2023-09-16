import React, { useEffect, useState, useRef } from 'react';

// react-router-dom
import { useLocation, useNavigate } from "react-router-dom";

// firebase
import { ref, getDatabase, onValue, update } from "firebase/database";

// styles
import '../../../styles/HostTest/Results.css';

// connect from react-redux
import { connect } from "react-redux";

// useAuth
import { useAuth } from '../../../contexts/AuthContext';

// Player component
import Player from './Player';

const Results = ({ language }) => {
  // useAuth
  const { currentUser } = useAuth();

  // useNavigate
  const navigate = useNavigate();

  const location = useLocation();

  const { title, code, questions } = location.state;

  // database
  const database = getDatabase();
  const gamesRef = useRef();
  const playersRef = useRef();

  // useEffect
  useEffect(() => {
    gamesRef.current = ref(database, "/games");
    playersRef.current = ref(database, "/players");
  }, [database, playersRef]);

  // userGame state
  const [userGame, setUserGame] = useState({});

  // index state
  const [index, setIndex] = useState(0);

  // db data state
  const [dataDB, setDataDB] = useState({});

  // players state
  const [players, setPlayers] = useState([]);

  // useEffect
  useEffect(() => {
    onValue(playersRef.current, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const playersData = Object.values(data);

        const filteredPlayers = playersData.filter((player) => {
          return player.value.game === code.toString();
        });

        // sort filteredPlayers by score
        filteredPlayers.sort((a, b) => {
          return b.value.score - a.value.score;
        });

        setPlayers(filteredPlayers);
      }
    });

    // get games by onValue and delete with the code which is equal to code
    onValue(gamesRef.current, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const gamesData = Object.values(data);

        // find this game
        const userGameDB = gamesData.find((game) => {
          return game.value.code === code;
        });

        setIndex(gamesData.indexOf(userGameDB));
        setUserGame(userGameDB);
        setDataDB(data)
      }
    });
  }, [playersRef, setPlayers, code]);

  // endQuiz function
  const endQuiz = () => {
    // update gamesRef
    update(ref(database, "/games/" + Object.values(Object.keys(dataDB))[index]), {
      value: {
        code: "",
        quiz: {
          title: userGame.value.quiz.title,
          questions: userGame.value.quiz.questions
        },
        host: currentUser.uid,
        status: "ended"
      }
    });

    // navigate to the home page
    navigate("/");
  }

  return (
    <section className='results'>
      {/* independent square and circle */}
      <div className='results__square'></div>
      <div className='results__circle'></div>

      <div className="results__wrap">
        {title && <h1 className='results__quiz-title'>{title}</h1>}

        {code && <h2 className='results__quiz-code'>{code}</h2>}
      </div>


      <main className="results__main">
        <ul className="results__players">
          {players && players.map((player) => {
            return (
              <Player
                key={player.value.name}
                name={player.value.name}
                score={player.value.score}
                point={(player.value.score / 1000) / (questions && questions.length) * 12}
              />
            );
          })}
        </ul>
      </main>

      <footer className='results__footer'>
        <button className="results__end-quiz" onClick={endQuiz}>
          {/* according to the chosen language display text */}
          {language === "en" ? "End Quiz" : language === "ua" ? "Завершити тестування" : "Pełne testowanie"}
        </button>
      </footer>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)(Results);
