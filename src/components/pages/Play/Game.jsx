import React, { useEffect, useState, useRef } from 'react';

// useLocation from react-router-dom
import { useLocation } from 'react-router-dom';

// onValue
import { onValue } from "firebase/database";

// useAuth
import { useAuth } from '../../../contexts/AuthContext';

// getDatabase, ref
import { getDatabase, ref } from "firebase/database";

// styles
import '../../../styles/Play/Game.css';

// Footer component
import Footer from './Footer';

// QuestionsCount component
import QuestionsCount from './QuestionsCount';

// styles
import '../../../styles/Play/Game.css';

const Game = () => {
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
    }
  }, [currentUser, database, gamesRef]);

  // useLocation
  const location = useLocation();

  const { name, code } = location.state;

  // questions state
  const [questions, setQuestions] = useState([]);

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
  const answerQuestion = (question, answer) => {
    // check if currentQuestion is less than questions length
    if (currentQuestion <= questions.length) {
      // check if answer is equal to one of the elements in question.correctAnswers
      question.correctAnswers.forEach((correctAnswer) => {
        if (answer === question.answers[correctAnswer]) {
          // increment score
          setScore(score + 1000);
        }
      });

      // increment currentQuestion
      setCurrentQuestion(currentQuestion + 1);
    }
  }

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
          if (currentQuestion === key + 1) {
            return (
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
          }
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
