import React, { useState, useEffect, useMemo } from 'react';

// connect from react-redux
import { connect } from 'react-redux';

// getDatabase, ref from firebase
import { getDatabase, ref } from "firebase/database";

// onValue from firebase
import { onValue } from "firebase/database";

// cover image
import coverImage from "./img/cover-img.png";

// Link react router
import { Link } from "react-router-dom";

// push from firebase
import { push } from "firebase/database";

// useAuth
import { useAuth } from '../../../contexts/AuthContext';

// styles
import "../../../styles/Library/Library.css"

const LibMain = ({ language }) => {
  // values from useAuth
  const {
    currentUser
  } = useAuth();

  // database
  const database = getDatabase();
  const quizzesRef = ref(database, "/quizzes/" + currentUser.uid);

  const gamesRef = ref(database, "/games");

  // names state
  const [names, setNames] = useState([]);

  // questions state
  const [questions, setQuestions] = useState([]);

  // quizName state
  const [quizName, setQuizName] = useState("");

  useEffect(() => {
    // Get data from the database
    onValue(quizzesRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const quizData = Object.values(data);

        const quizNames = quizData.map((quiz) => {
          return quiz.value.title;
        });

        // push quizNames to names
        setNames(quizNames);

        // get questions from quizData
        const quizQuestions = quizData.map((quiz) => {
          return quiz.value.questions;
        });

        // push quizQuestions to questions
        setQuestions(quizQuestions);

      } else {
        setNames([]);
      }
    });
  }, [setNames]);

  // generate random code but if it's already in the database generate another one and don't allow code less than 15 digits
  let code = Math.floor(Math.random() * 1000000000000000);

  // names array
  let quizzesNames = [];

  // questions array
  let qns = [];

  // save test to database function
  const handleClick = async (name) => {

    // find the index of the clicked quiz
    const index = names.findIndex((quiz) => {
      return quiz === name;
    });

    // get data from the database
    onValue(gamesRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const gameData = Object.values(data);

        // get codes from gameData
        const gameCodes = gameData.map((game) => {
          return game.value.code;
        });

        // get names from gameData
        quizzesNames = gameData.map((game) => {
          return game.value.quiz.title;
        });

        // get questions from gameData
        qns = gameData.map((game) => {
          return game.value.quiz.questions;
        });

        // check if code is equal to any code in gameCodes
        const checkCode = gameCodes.find((gameCode) => {
          return gameCode === code;
        });

        // if checkCode is true generate another code
        if (checkCode) {
          code = Math.floor(Math.random() * 1000000000000000);
        }

        // if code is less than 15 digits generate another code
        if (code < 100000000000000) {
          code = Math.floor(Math.random() * 1000000000000000);
        }
      }
    });

    // push question to database if it doesn't exist in gamesRef
    try {
      await push(gamesRef,
        {
          value: {
            code: code,
            quiz: {
              title: names[index],
              questions: questions[index]
            }
          }
        }
      );
    } catch {
      console.log("Failed to update test");
    }
  }

  const filterQuizzes = useMemo(() => {
    return names.filter(name => name.toLowerCase().includes(quizName.toLowerCase()));
  }, [names, quizName]);

  return (
    <main className='library__main'>
      <input
        type="text"
        className='library__search'
        placeholder='Search'
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
      />

      {/* Display quizzes */}
      <ul className="library-test__list">
        {names.length !== 0 ? filterQuizzes.map((quiz, index) => {
          return (
            <li className='host-test__quiz' key={index}>
              <div className="quiz__image">
                <img src={coverImage} alt={"Cover img" + index} />
              </div>
              <div className="quiz__info">
                <h1 className='quiz__title'>{quiz}</h1>

                <Link
                  to={"/host"}
                  state={{ title: quiz, code: code }}
                  className='quiz__host-button'
                  onClick={() => handleClick(quiz)}
                >
                  {/* according to the chosen language display text */}
                  {language === "en" ? "Play" : language === "ua" ? "Грати" : "Graj"}
                </Link>
              </div>
            </li>
          );
        })
          : <p className='no-quizzes'>
            {/* according to the chosen language, display text */}
            {language === "en" ? "No quizzes yet" : language === "ua" ? "Ще немає квізів" : "Brak quizów"}
          </p>
        }
      </ul>
    </main>
  );
}

// mapStateToProps
const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)(LibMain);