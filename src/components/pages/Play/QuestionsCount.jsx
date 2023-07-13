import React from 'react';

// connect from react-redux
import { connect } from 'react-redux';

const QuestionsCount = ({ currentQuestion, questionsLength, language }) => {
  return (
   <header className='game__header'>
    <div className='game__header-questions'>
      {currentQuestion <= questionsLength && 
        <p className='game__header-questions-number'>{currentQuestion}</p>
      }
    </div>
    <p className='game__header-questions-text'>
      {language === "en" ? "Question" : language === "ua" ? "Питання" : "Pytanie"}
    </p>
   </header>
  );
}

// map state to props
const mapStateToProps = state => ({
  language: state.language
});

export default connect(mapStateToProps)(QuestionsCount);
