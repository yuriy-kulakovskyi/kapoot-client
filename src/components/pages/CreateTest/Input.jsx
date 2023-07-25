import React, { useState } from 'react';

const Input = ({ index, question, setQuestions, language }) => {
  // input state
  const [input, setInput] = useState(question);

  return (
    <input 
      type="text" 
      placeholder=
      {language === 'en' ? "Enter the question..." : language === "ua" ? "Введіть питання..." : "Wprowadź pytanie..."}
      className='create-test__input'
      value={input}
      onChange={(event) => {
        setInput(event.target.value);
        // update questions state
        setQuestions((prevQuestions) => {
          const newQuestions = [...prevQuestions];
          newQuestions[index].question = event.target.value;
          return newQuestions;
        })
      }}
    />
  );
}

export default Input;
