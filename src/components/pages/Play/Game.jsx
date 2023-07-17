import React, { useEffect, useState, useRef } from 'react';

// useLocation from react-router-dom
import { useLocation } from 'react-router-dom';

// onValue
import { onValue } from "firebase/database";

// useAuth
import { useAuth } from '../../../contexts/AuthContext';

// getDatabase, ref, update from firebase
import { getDatabase, ref, update } from "firebase/database";

// styles
import '../../../styles/Play/Game.css';

// Footer component
import Footer from './Footer';

// QuestionsCount component
import QuestionsCount from './QuestionsCount';

// useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

// styles
import '../../../styles/Play/Game.css';

const Game = () => {
  // values from useAuth
  const {
    currentUser
  } = useAuth();

  // useNavigate
  const navigate = useNavigate();

  // database
  const database = getDatabase();

  // gamesRef
  const gamesRef = useRef();

  // playersRef
  const playersRef = useRef();

  useEffect(() => {
    if (currentUser) {
      gamesRef.current = ref(database, "/games");
      playersRef.current = ref(database, "/players");
    }
  }, [currentUser, database, gamesRef]);

  // useLocation
  const location = useLocation();

  const { name, code } = location.state || "";

  // questions state
  const [questions, setQuestions] = useState([]);

  // useEffect
  useEffect(() => {
    if (!code && !name) {
      navigate("/");
    }
  }, [code, name, navigate, questions]);

  // currentQuestion state
  const [currentQuestion, setCurrentQuestion] = useState(1);

  // score state
  const [score, setScore] = useState(0);

  useEffect(() => {
    onValue(gamesRef.current, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const gameData = Object.values(data);

        // get codes from gameData
        const gameCodes = gameData.map((game) => {
          return game.value.code;
        });

        // get questions checking the playCode
        const gameQuestions = gameData.map((game) => {
          return game.value.quiz.questions;
        });

        // check if code is equal to any code in gameCodes
        gameCodes.forEach((gameCode) => {
          if (code === gameCode.toString()) {
            setQuestions(gameQuestions[gameCodes.indexOf(gameCode)])
          } else {
            console.log("Code is not equal to a game code or it's in progress");
          }
        });
      }
    });
  }, [code]);

  // answerQuestion function
  const answerQuestion = (question, selectedAnswer) => {
    if (currentQuestion <= questions.length) {
      if(question.correctAnswers.includes(question.answers.indexOf(selectedAnswer))) {
        setScore(score + 1000);
      }

      setCurrentQuestion(currentQuestion + 1);
    }
  };  
  
  // when the user has answered all questions and the game is over push update his score to the database
  useEffect(() => {
    if (currentQuestion > questions.length) {
      // update score
      update(ref(database, `/players/${currentUser.uid}`), {
        value: {
          name: name,
          score: score,
          game: code
        }
      });
    }
  }, [currentQuestion, database, name, playersRef, questions.length, score, setScore, code, currentUser]);

  return (
    <section className='game'>
      {/* display questions count */}
      {currentQuestion <= questions.length && 
        <QuestionsCount
          currentQuestion={currentQuestion}
          questionsLength={questions.length}
        />
      }
      
      {/* display questions */}
      {
        // show questions according to currentQuestion
        questions.map((question, key) => {
          return (
            currentQuestion === key + 1 &&
            <div key={key} className="question">
              <h1 className='question__title'>{question.question}</h1>
              {/* display answers */}
              <div className="question__answers">
                {
                  question.answers.map((answer, key) => {
                    return (
                      <div key={key} className="question__answer">
                        <button
                          className={"question__answer-button button" + key}
                          onClick={() => answerQuestion(question, answer)}
                        >
                          <span className='answer__figure-wrap'>{
                            // depending on key, display a figure
                            key === 0 ? <div className='answer__figure triangle'></div> : 
                            key === 1 ? <div className='answer__figure rhombus'></div> :
                            key === 2 ? <div className='answer__figure circle'></div> :
                            <div className='answer__figure square'></div>
                          }</span>

                          <span className='answer__text'>
                            {answer}
                          </span>
                        </button>
                      </div>
                    )
                  })}
              </div>
            </div>
          )
        })}

      {/* display footer */}
      <Footer
        nickname={name}
        score={score}
        progress={(currentQuestion - 1) / questions.length * 100}
        questionsLength={questions.length}
      />
    </section>
  );
}

export default Game;
