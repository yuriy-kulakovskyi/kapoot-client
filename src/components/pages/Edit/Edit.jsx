import React, { useEffect, useState, useRef } from 'react';

// location state
import { useLocation } from "react-router-dom";

// useNavigate
import { useNavigate } from "react-router-dom";

// connect to redux
import { connect } from 'react-redux';

// Link from react-router-dom
import { Link } from 'react-router-dom';

// firebase
import { getDatabase, ref, get, remove, push, onValue } from "firebase/database";

// useAuth
import { useAuth } from "../../../contexts/AuthContext"

// styles
import "../../../styles/Edit/Edit.css";

// pencil svg icons
import PencilIcon from "../../../assets/svg/pencil.svg";

// delete icon
import DeleteIcon from '../../../assets/svg/delete.svg';

// correct icon
import CorrectIcon from "../../../assets/svg/correct.svg";

// incorrect icon
import InCorrectIcon from "../../../assets/svg/incorrect.svg";

// Header component
import Header from "../../Header";

// Aside component
import Aside from "../../Aside";

const Edit = ({ language }) => {
  // database
  const database = getDatabase();

  // currentUser
  const { currentUser } = useAuth();

  // location
  const location = useLocation();

  // get data from location state
  const { id, title, description, questions } = location.state;

  // useNavigate
  const navigate = useNavigate();

  // gamesRef
  const gamesRef = useRef();

  // if title is undefined navigate to dashboard
  useEffect(() => {
    title === undefined && navigate("/dashboard");

    gamesRef.current = ref(database, `/games`);
  }, [title, navigate, database, gamesRef]);

  // isOpen state
  const [isOpen, setIsOpen] = useState(false);

  // isShowing state
  const [isShowing, setIsShowing] = useState(false);

  // generate random code but if it's already in the database generate another one and don't allow code less than 15 digits
  let code = Math.floor(Math.random() * 1000000000000000);

  // delete a quiz function
  function deleteQuiz() {
    const quizzesRef = ref(database, `quizzes/${currentUser.uid}`);

    // Use get() to read the data once without continuous listening
    get(quizzesRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const quizzesKeys = Object.keys(data);
        const quizzes = Object.values(data);

        // Find the index of the quiz to be updated
        const selectedQuizIndex = quizzes.findIndex(item => item.value.id === id);

        // If the quiz to be updated is found
        if (selectedQuizIndex !== -1) {
          const selectedQuizKey = quizzesKeys[selectedQuizIndex];

          // Remove the quiz data
          remove(ref(database, `quizzes/${currentUser.uid}/${selectedQuizKey}`));
        }
      }
    });
  }

  // play the quiz
  const playQuiz = async () => {
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
              title: title,
              questions: questions
            }
          }
        }
      );
    } catch {
      console.log("Failed to update test");
    }
  }

  return (
    <section className='edit'>
      {/* Header */}
      <Header />

      {/* Aside */}
      <Aside />

      <div className="edit__left-part">
        <div className="left-part__content">

          {/* title */}
          <h1 className="edit__title">
            {title}
          </h1>

          {/* buttons */}
          <div className="edit__buttons">
            {/* edit button */}
            <Link
              to={"/create-kapoot"}
              className="buttons__button"
              state={
                {
                  editId: id,
                  editQuestions: questions,
                  editTitle: title,
                  editDescription: description
                }
              }
            >
              <img
                src={PencilIcon}
                alt="pencil"
                className='button__icon'
              />
            </Link>

            {/* button which has a dropdown menu */}
            <div className="buttons__dropdown">
              <button
                className='buttons__dropdown__button buttons__button'
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="buttons__dropdown__button-text">⋮</span>
              </button>

              {/* dropdown menu */}
              {isOpen && <div className="dropdown__menu">
                <ul className='dropdown__menu-list'>
                  <li className='list__item'>
                    <button
                      className='dropdown__menu-item'
                      onClick={() => {
                        deleteQuiz();
                        setIsOpen(!isOpen);
                        navigate("/");
                      }}
                    >
                      {/* delete icon */}
                      <img
                        src={DeleteIcon}
                        alt="delete icon"
                        className='dropdown__menu-icon'
                      />

                      {language === 'en' ? "Delete" : language === 'ua' ? "Видалити" : "Usunąć"}
                    </button>
                  </li>
                </ul>
              </div>}
            </div>
          </div>

          {/* start a game button */}
          <div className="edit__row">
            <Link
              to={"/host"}
              state={{ title: title, code: code }}
              className='edit__row__play-btn'
              onClick={playQuiz}
            >
              {/* according to the chosen language display text */}
              {language === "en" ? "Start" : language === "ua" ? "Почати" : "Zacząć"}
            </Link>
          </div>

          {/* description */}
          <p className="edit__description">
            {description}
          </p>
        </div>
      </div>

      {/* questions */}
      <div className="edit__questions">
        {/* questions head */}
        <div className="questions__header">
          <h3 className="questions__title">
            {
              // according to the chosen language display text
              language === 'en' ? "Questions " : language === "ua" ? "Запитання " : "Pytania "
            }
            ({questions.length})
          </h3>

          <button
            className="questions__show-hide"
            onClick={() => setIsShowing(!isShowing)}
          >
            {
              !isShowing ?
                language === 'en' ? "Show answers" :
                  language === "ua" ? "Показати відповіді" :
                    "Pokaż odpowiedzi" :

                language === "en" ? "Hide answers" :
                  language === "ua" ? "Приховати відповіді" :
                    "Ukryj odpowiedzi"
            }
          </button>
        </div>

        {/* questions body */}
        <ul className="questions__list">
          {questions.map((question, key) => {
            return (
              <li className='questions__question' key={key}>
                <div className="question__wrap">
                  <p className="question__count">
                    {key + 1}
                  </p>

                  <h3 className="question__text">
                    {question.question}
                  </h3>
                </div>

                <ul className="question__answers">
                  {isShowing && question.answers.map((answer, key) => {
                    return (
                      <li 
                        key={key} 
                        className="answers__answer"
                      >
                        <div className="answer__left">
                          <div 
                            className={
                              key === 0 ? "answer__left__figure answer__left__triangle" :
                              key === 1 ? "answer__left__figure answer__left__rhombus" :
                              key === 2 ? "answer__left__figure answer__left__circle" :
                              key === 3 ? "answer__left__figure answer__left__square" : null
                            }
                          >
                            <span></span>
                          </div>
                          <h5 className="answer__left__option">
                            {answer}
                          </h5>
                        </div>
                        <div className="answer__right">
                          <img 
                            src={
                              question.correctAnswers.includes(key) ?
                              CorrectIcon :
                              InCorrectIcon
                            }
                            alt="correct/uncorrect" 
                          />
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>

    </section>
  );
}

const mapStateToProps = (state) => ({
  language: state.language
});

export default connect(mapStateToProps)(Edit);