import React, { useEffect, useState } from 'react';

// onValue
import { onValue } from "firebase/database";

// cover image import
import coverImage from "./img/cover-img.png";

// styles
import "../../../styles/Dashboard/Quizzes.css";

const Quizes = ({ quizzesRef }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Get data from database
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
        My kapoots
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

export default Quizes;
