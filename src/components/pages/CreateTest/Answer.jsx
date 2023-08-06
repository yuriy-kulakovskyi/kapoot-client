import React, { useState } from 'react';

const Answer = ({ index, setQuestions, answers, correctAnswers, questionIndex, figure }) => {
  // isChecked state
  const [isChecked, setIsChecked] = useState(correctAnswers.includes(index));

  return (
    <li className={"answer answer--" + figure}>
      <div className="answer__head">
        <input
          type="checkbox"
          checked={isChecked}
          className="answer__checkbox"
          onChange={() => {
            // update questions state
            setQuestions(prevQuestions => {
              const newQuestions = [...prevQuestions];
              
              if (isChecked) {
                newQuestions[questionIndex].correctAnswers = newQuestions[questionIndex].correctAnswers.filter((value) => {
                  return value !== index;
                });
              } else {
                newQuestions[questionIndex].correctAnswers.push(index);
              }

              // delete duplicate values
              newQuestions[questionIndex].correctAnswers = newQuestions[questionIndex].correctAnswers.filter((value, index, self) => {
                return self.indexOf(value) === index;
              });

              return newQuestions;
            })
            setIsChecked(!isChecked);
          }}
        />
      </div>

      <div className="answer__body">
        <input 
          type="text" 
          className='answer__input'
          value={answers[index]}
          onChange={(event) => {
            // update questions state
            setQuestions(prevQuestions => {
              const newQuestions = [...prevQuestions];
              newQuestions[questionIndex].answers[index] = event.target.value;
              return newQuestions;
            })
          }}
        />
      </div>
    </li>
  );
}

export default Answer;