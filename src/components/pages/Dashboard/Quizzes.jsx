import React, { useEffect, useState } from 'react';

// onValue
import { onValue } from "firebase/database";

// cover image import
import coverImage from "./img/cover-img.png";

// styles
import "../../../styles/Dashboard/Quizzes.css";

// text.json
import text from "./text.json";

// connect
import { connect } from "react-redux";

const Quizes = ({ quizzesRef, language }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Get data from the database
    onValue(quizzesRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const quizData = Object.values(data);
        setQuizzes(quizData);
      } else {
        setQuizzes([]);
      }
    });
  }, [quizzesRef]);

  return (
    <div className='quizzes box'>
      {/* Title */}
      <h1 className="quizzes__title">
        {/* according to the chosen language, display text */}
        {language === "en" ? text.titles[1].en : language === "ua" ? text.titles[1].ua : text.titles[1].pl}
      </h1>

      {/* Display quizzes */}
      <ul className="quizzes__list">
        {quizzes.length !== 0 ? quizzes.map((quiz, index) => {
          return (
            <li className='quizzes__quiz' key={index}>
              <div className="quiz__image">
                <img src={coverImage} alt={"Cover img" + index} />
              </div>
              <div className="quiz__info">
                <h1 className='quiz__title'>{quiz}</h1>
              </div>
            </li>
          );
        })
        : <p className='no-quizzes'>No quizzes yet</p>
      }
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)(Quizes);
