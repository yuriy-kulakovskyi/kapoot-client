import React, { useState, useEffect } from 'react';

const Answer = ({ id, figure, updateInputValue, setCorrectAnswers, unsetCorrectAnswers, clearInput, setClearInput }) => {
  // input state
  const [inputVal, setInputVal] = useState("");

  // isChecked state
  const [isChecked, setIsChecked] = useState(false);

  // set input value to value prop
  const updateInput = (value) => {
    setClearInput(false);
    setInputVal(value);
    updateInputValue(id, value);
  }

  useEffect(() => {
    if (clearInput) { 
      setInputVal("");
      setIsChecked(false);
    }
  }, [clearInput])

  return (
    <div className={"answer " + "answer--" + figure}>
      <div className="answer__head">
        {/* checkbox to set correct answer */}
        <div className="head__checkbox">
          <input 
            type="checkbox"
            checked={isChecked}
            className="answer__checkbox"
            onChange={e => {
              setIsChecked(e.target.checked)
              e.target.checked ? setCorrectAnswers(id) : unsetCorrectAnswers(id)}
            }
          />
        </div>
      </div>
      <div className="answer__body">
        <input
          type="text"
          value={clearInput ? "" : inputVal}
          className='answer__input'
          onChange={(e) => updateInput(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Answer;
