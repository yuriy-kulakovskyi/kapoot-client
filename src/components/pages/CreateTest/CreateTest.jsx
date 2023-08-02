import React, { useState, useEffect } from 'react';

// useNavigate
import { useNavigate } from 'react-router-dom';

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

// location state
import { useLocation } from "react-router-dom";

// styles
import '../../../styles/CreateTest/CreateTest.css';

// delete icon
import DeleteIcon from '../../../assets/svg/delete.svg';

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
  // navigate
  const navigate = useNavigate();

  // location
  const location = useLocation();

  // get data from location state
  const { editId, editQuestions, editTitle, editDescription } = location.state || "";
    
  // questions state
  const [questions, setQuestions] = useState(editQuestions || [{
    answers: ["", "", "", ""],
    correctAnswers: [],
    question: ""
  }]);

  // currentQuestionStep state
  const [currentQuestionStep, setCurrentQuestionStep] = useState(0);

  // open settings state
  const [openSettings, setOpenSettings] = useState(false);

  // title state
  const [title, setTitle] = useState(editTitle || '');

  // description state
  const [description, setDescription] = useState(editDescription || '');

  // isOpen state
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    questions.length === 0 && navigate("/");
  }, [questions, navigate])

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
        editId={editId && editId}
      />}

      {/* padding wrapper */}
      {!openSettings && <div className="padding-wrapper">
        {questions.map((question, id) => {
          // display questions according to currentQuestionStep
          return (
            id === currentQuestionStep &&
            <div className='padding-wrapper__gap' key={id}>
              <div className="gap__row">
                <Input
                  index={id}
                  question={question.question}
                  setQuestions={setQuestions}
                  language={language}
                />

                {/* button which has a dropdown menu */}
                <div className="row__dropdown">
                  <button 
                      className='dropdown__button'
                      onClick={() => setIsOpen(!isOpen)}
                    >
                    <span className="dropdown__button-text">⋮</span>
                  </button>
                  
                  {/* dropdown menu */}
                  {isOpen && <div className="dropdown__menu">
                    <ul className='dropdown__menu-list'>
                      <li className='list__item'>
                        <button
                          className='dropdown__menu-item'
                          onClick={() => {
                            // remove current question
                            setQuestions(questions.filter((question, index) => index !== id));

                            // if currentQuestionStep is not 0, then decrease it by 1
                            if (currentQuestionStep !== 0) {
                              setCurrentQuestionStep(currentQuestionStep - 1);
                              setIsOpen(false);
                            }
                          }}
                        >
                          {/* delete icon */}
                          <img
                            src={DeleteIcon}
                            alt="delete icon"
                            className='dropdown__menu-icon'
                          />

                          {language === 'en' ? "Delete" : language === 'ua' ? "Видалити" : "Usunąć"}
                        </button>
                      </li>
                    </ul>
                  </div>}
                </div>
              </div>

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
        setIsOpen={setIsOpen}
      />}
    </section>
  );
}

const mapStateToProps = (state) => ({
  language: state.language
});

export default connect(mapStateToProps)(CreateTest);