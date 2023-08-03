import React from 'react';

// styles
import "../../../styles/CreateTest/CreateTest.css";

const AsideMenu = ({ questions, setQuestions, setCurrentQuestionStep, currentQuestionStep, language, setIsOpen }) => {
  return (
    <aside className='aside-menu'>
      {/* questions */}
      <ul className='aside__question-links'>
        {questions.map((question, id) => {
          // display question steps
          return (
            <li key={id} className="links__question">
              <p className="question__count">
                {id + 1}
              </p>
              <button
                key={id}
                className={currentQuestionStep === id ? "question-link link-active" : "question-link"}
                onClick={() => {
                  setCurrentQuestionStep(id);
                  setIsOpen(false);
                }}
              >{question.question ? 

                question.question.length > 8 ?

                question.question.slice(0, 8) + "..." :

                question.question
                
                :
                // according to the chosen language display text
                language === 'en' ? "Question" : language === 'ua' ? "Питання" :  "Pytanie"
              }
              </button>
            </li>
          );
        })}
      </ul>

      {/* add question button */}
      <button
        className='add-question'
        onClick={() => {
          // update questions state
          setQuestions((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            newQuestions.push({
              answers: ["", "", "", ""],
              correctAnswers: [],
              question: ""
            });
            return newQuestions;
          });

          setCurrentQuestionStep(questions.length);

          setIsOpen(false);
        }}
      >
        {
          // according to the chosen language display text
          language === 'en' ? "Add question" :
          language === 'ua' ? "Додати питання" :
          "Dodać pytanie"
        }
      </button>
    </aside>
  );
}

export default AsideMenu;
