import React from 'react';

const Footer = ({ questions, setQuestions, setCurrentQuestionStep, currentQuestionStep, language }) => {
  return (
    <footer className='footer'>
      <ul className='footer__question-links'>
        {questions.map((question, id) => {
          // display question steps
          return (
            <li key={id} className="links__question">
              {id + 1}
              <button
                key={id}
                className={currentQuestionStep === id ? "question-link link-active" : "question-link"}
                onClick={() => {
                  setCurrentQuestionStep(id);
                }}
              >{question.question ? 
                question.question : 
                // according to the chosen language display text
                language === 'en' ? "Question" : language === 'ua' ? "Питання" :  "Pytanie"
              }
              </button>
            </li>
          );
        })}
      </ul>

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

          setCurrentQuestionStep(currentQuestionStep + 1);
        }}
      >+</button>
    </footer>
  );
}

export default Footer;
