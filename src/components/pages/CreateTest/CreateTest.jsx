import React, { useState } from 'react';

// Answer component import
import Answer from './Answer';

// Footer component import
import Footer from './Footer';

// Header component import
import Header from '../../Header';

// Settings component import
import Settings from './Settings';

// connect to redux
import { connect } from 'react-redux';

// styles
import '../../../styles/CreateTest/CreateTest.css';

const blocks = [
  {
    id: 0,
    figure: 'triangle',
    checked: false
  },

  {
    id: 1,
    figure: 'rhombus',
    checked: false
  },

  {
    id: 2,
    figure: 'circle',
    checked: false
  },

  {
    id: 3,
    figure: 'square',
    checked: false
  }
];

const CreateTest = ({ language }) => {
  // questionInputValue state
  const [questionInputValue, setQuestionInputValue] = useState('');

  // answers state
  const [answers, setAnswers] = useState([]);

  // correct answer state
  const [correctAnswer, setCorrectAnswer] = useState([]);

  // clearInput state
  const [clearInput, setClearInput] = useState(false);

  // title state
  const [title, setTitle] = useState('');

  // description state
  const [description, setDescription] = useState('');

  // questions state
  const [questions, setQuestions] = useState([]);

  // open settings state
  const [openSettings, setOpenSettings] = useState(false);

  // updateInputValue function
  const updateInputValue = (index, value) => {
    const newInputValues = [...answers];
    newInputValues[index] = value;
    setAnswers(newInputValues);
  };

  // setCorrectAnswers function
  const setCorrectAnswers = (index) => {
    const newCorrectAnswers = [...correctAnswer];
    newCorrectAnswers[index] = index;
    setCorrectAnswer(newCorrectAnswers);
  };

  // unsetCorrectAnswers function
  const unsetCorrectAnswers = (index) => {
    const newCorrectAnswers = [...correctAnswer];
    newCorrectAnswers[index] = null;
    setCorrectAnswer(newCorrectAnswers);
  };

  // updateTest function
  const updateTest = () => {
    // delete empty answers
    const filteredAnswers = correctAnswer.filter(answer => answer !== null && answer !== undefined);

    const question = {
      id: questions.length,
      question: questionInputValue,
      answers: answers,
      correctAnswers: filteredAnswers,
    };

    // push question to questions
    setQuestions([...questions, question]);

    // clear questionInputValue
    setQuestionInputValue("");

    // clear answers
    setAnswers([]);

    // clear correctAnswer
    setCorrectAnswer([]);

    // clear input values
    setClearInput(true);
  };

  return (
    <section className='create-test'>
      {/* Settings component */}
      {openSettings &&
        <Settings
          setOpenSettings={setOpenSettings}
          setTitle={setTitle}
          setDescription={setDescription}
          title={title}
          description={description}
          language={language}
        />
      }

      {/* header */}
      {!openSettings && <Header
        creatingTest={true}
        setTitle={setTitle}
        setDescription={setDescription}
        setOpenSettings={setOpenSettings}
        title={title}
        description={description}
        questions={questions}
      />}

      {/* padding wrapper */}
      {!openSettings && <div className="padding-wrapper">
        <input
          type="text"
          className='create-test__input'
          placeholder=
          {language === 'en' ? 'Enter your question' : language === "ua" ? 'Введіть ваше запитання' : 'Wprowadź swoje pytanie'}
          value={questionInputValue}
          onChange={(e) => setQuestionInputValue(e.target.value)}
        />

        {/* Answers */}
        <div className="create__test__answers">
          <div className="answers__blocks">
            {/* Display answers figuring on currentQuestion else map blocks */}
            {blocks.map((block, index) => (
              <Answer
                key={index}
                id={index}
                figure={block.figure}
                updateInputValue={updateInputValue}
                setCorrectAnswers={setCorrectAnswers}
                unsetCorrectAnswers={unsetCorrectAnswers}
                clearInput={clearInput}
                setClearInput={setClearInput}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <Footer
          updateTest={updateTest}
          questions={questions.length}
        />
      </div>}
    </section>
  );
}

const mapStateToProps = (state) => ({
  language: state.language
});

export default connect(mapStateToProps)(CreateTest);