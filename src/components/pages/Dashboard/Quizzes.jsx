import React, { useEffect, useState, useRef } from 'react';

// onValue
import { onValue } from "firebase/database";

// cover image import
import coverImage from "./img/cover-img.png";

// styles
import "../../../styles/Dashboard/Quizzes.css";

// firebase
import { getDatabase, ref } from "firebase/database";

// text.json
import text from "./text.json";

// connect
import { connect } from "react-redux";

// useAuth
import { useAuth } from '../../../contexts/AuthContext';

const Quizes = ({ language }) => {
  // values from useAuth
  const {
    currentUser
  } = useAuth();

  // database
  const database = getDatabase();

  // quizzesRef
  const quizzesRef = useRef();

  useEffect(() => {
    if (currentUser) {
      quizzesRef.current = ref(database, "/quizzes/" + currentUser.uid);
    }
  }, [currentUser, database, quizzesRef]);

  // names state
  const [names, setNames] = useState([]);

  useEffect(() => {
    // Get data from the database
    onValue(quizzesRef.current, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const quizData = Object.values(data);

        // get quiz names
        const quizNames = quizData.map((quiz) => {
          return quiz.value.title;
        });

        // push quizNames to names
        setNames(quizNames);

      } else {
        setNames([]);
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
        {names.length !== 0 ? names.map((quiz, index) => {
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
        : <p className='no-quizzes'>
            {/* according to the chosen language, display text */}
            {language === "en" ? text.errors[3].en : language === "ua" ? text.errors[3].ua : text.errors[3].pl}
        </p>
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
