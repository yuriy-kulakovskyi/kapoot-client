import React, { useState } from 'react';

const Input = ({ index, question, setQuestions }) => {
  // input state
  const [input, setInput] = useState(question);

  return (
    <input 
      type="text" 
      placeholder="Enter a question"
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
