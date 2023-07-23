import React, { useState } from 'react';

// Answer component import
import Answer from './Answer';

// Footer component import
import Footer from './Footer';

// Header component import
import Header from '../../Header';

// Settings component import
import Settings from './Settings';

// Input component import
import Input from './Input';

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
  // questions state
  const [questions, setQuestions] = useState([{
    answers: ["", "", "", ""],
    correctAnswers: [],
    question: ""
  }]);

  // currentQuestionStep state
  const [currentQuestionStep, setCurrentQuestionStep] = useState(0);

  // open settings state
  const [openSettings, setOpenSettings] = useState(false);

  // title state
  const [title, setTitle] = useState('');

  // description state
  const [description, setDescription] = useState('');

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
        {questions.map((question, id) => {
          // display questions according to currentQuestionStep
          return (
            id === currentQuestionStep &&
            <div className='padding-wrapper__gap' key={id}>
              <Input
                index={id}
                question={question.question}
                setQuestions={setQuestions}
                language={language}
              />

              <div className="create-test__answers">
                <div className="answers__blocks">
                  {question.answers.map((answer, index) => {
                    return (
                      <Answer
                        key={index}
                        index={index}
                        figure={blocks[index].figure}
                        setQuestions={setQuestions}
                        answers={question.answers}
                        correctAnswers={question.correctAnswers}
                        questionIndex={id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>}

      {!openSettings && <Footer
        questions={questions}
        setQuestions={setQuestions}
        setCurrentQuestionStep={setCurrentQuestionStep}
        currentQuestionStep={currentQuestionStep}
        language={language}
      />}
    </section>
  );
}

const mapStateToProps = (state) => ({
  language: state.language
});

export default connect(mapStateToProps)(CreateTest);