import React, { useEffect, useState, useRef } from 'react';

// cover image import
import coverImage from "./img/cover-img.png";

// styles
import "../../../styles/Dashboard/Quizzes.css";

// firebase
import { getDatabase, ref, onValue } from "firebase/database";

// push from firebase
import { push } from "firebase/database";

// text.json
import text from "./text.json";

// connect
import { connect } from "react-redux";

// useAuth
import { useAuth } from '../../../contexts/AuthContext';

// Link react router
import { Link } from "react-router-dom";

const Quizes = ({ language }) => {
  // values from useAuth
  const {
    currentUser
  } = useAuth();

  // questions state
  const [questions, setQuestions] = useState([]);

  // identifiers state
  const [identifiers, setIdentifiers] = useState([]);

  // database
  const database = getDatabase();

  // quizzesRef
  const quizzesRef = useRef();

  // gamesRef
  const gamesRef = useRef();

  // generate random code but if it's already in the database generate another one and don't allow code less than 15 digits
  let code = Math.floor(Math.random() * 1000000000000000);

  useEffect(() => {
    if (currentUser) {
      quizzesRef.current = ref(database, "/quizzes/" + currentUser.uid);
      gamesRef.current = ref(database, "/games");
    }
  }, [currentUser, database, quizzesRef]);

  // names state
  const [names, setNames] = useState([]);

  // descriptions state
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    // Get data from the database
    onValue(quizzesRef.current, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const quizData = Object.values(data);

        const quizNames = quizData.map((quiz) => {
          return quiz.value.title;
        });

        // push quizNames first three to names
        setNames(quizNames);

        // get questions from quizData
        const quizQuestions = quizData.map((quiz) => {
          return quiz.value.questions;
        });

        // get description from gameData
        const quizDescriptions = quizData.map((game) => {
          return game.value.description;
        });

        // get identifiers from quizData
        const quizIdentifiers = quizData.map((game) => {
          return game.value.id;
        });

        // push quizDescriptions to descriptions
        setDescriptions(quizDescriptions);

        // push quizQuestions to questions
        setQuestions(quizQuestions);

        // push quizIdentifiers to identifiers
        setIdentifiers(quizIdentifiers);

      } else {
        setNames([]);
      }
    });
  }, [setNames]);

  // save test to database function
  const handleClick = async (name) => {

    // find the index of the clicked quiz
    const index = names.findIndex((quiz) => {
      return quiz === name;
    });

    // get data from the database
    onValue(gamesRef.current, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const gameData = Object.values(data);

        // get codes from gameData
        const gameCodes = gameData.map((game) => {
          return game.value.code;
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
      await push(gamesRef.current,
        {
          value: {
            code: code,
            quiz: {
              title: names[index],
              questions: questions[index]
            },
            host: currentUser.uid,
            status: "in progress"
          }
        }
      );
    } catch {
      console.log("Failed to update test");
    }
  }

  return (
    <div className='quizzes box'>
      {/* Title */}
      <h1 className="quizzes__title">
        {/* according to the chosen language, display text */}
        {language === "en" ? text.titles[1].en : language === "ua" ? text.titles[1].ua : text.titles[1].pl}
      </h1>

      {/* Display first three quizzes */}
      <ul className="quizzes__list">
        {names.length !== 0 ? names.map((quiz, index) => {
          return (
            <li className='quizzes__quiz' key={index}>
              <div className="quiz__image">
                <img src={coverImage} alt={"Cover img" + index} />
              </div>
              <div className="quiz__info">
                <Link
                  to={"/edit"}
                  className='quiz__title'
                  state={{ id: identifiers[index], title: quiz, description: descriptions[index], questions: questions[index] }}
                >
                  {quiz}
                </Link>

                <Link
                  to={"/host"}
                  state={{ title: quiz, code: code, questions: questions[index] }}
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)(Quizes);
