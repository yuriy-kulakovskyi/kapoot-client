import React, { useRef, useEffect } from 'react';

// styles
import '../styles/Header.css';

// Link component from React Router
import { Link } from 'react-router-dom';

// onValue
import { onValue } from "firebase/database";

// functions import
import { changeLanguage, toggleMenu } from '../actions';

// Redux connect function import
import { connect } from "react-redux";

// firebase
import { getDatabase, ref, push, update, get } from "firebase/database";

// useAuth
import { useAuth } from '../contexts/AuthContext';

// ChangeLanguage component import
import ChangeLanguage from './ChangeLanguage';

// SettingsButton component import
import SettingsButton from './SettingsButton';

// setting svg icon
import SettingsIcon from "../assets/svg/settings.svg";

// useNavigate
import { useNavigate } from 'react-router-dom';

// navButtons array
const navButtons = [
  {
    en: 'Sign up',
    ua: 'Зареєструватися',
    pl: "Zarejestrować się",
    path: '/signup',
    background: true
  },

  {
    en: 'Log in',
    ua: 'Увійти',
    pl: "Zaloguj się",
    path: '/login'
  }
];

// languages array
const languages = [
  {
    title: 'ENGLISH',
  },

  {
    title: 'УКРАЇНСЬКА',
  },

  {
    title: 'POLSKI',
  }
];

const Header = ({ language, changeLanguage, toggleMenu, isDisplayed, creatingTest, setOpenSettings, title, description, questions, playing, settings, editId }) => {
  // useAuth
  const { currentUser } = useAuth();

  // navigate
  const navigate = useNavigate();

  // database
  const database = getDatabase();

  // quizzesRef
  const quizzesRef = useRef();

  // generate random id but if it's already in the database generate another one and don't allow code less than 15 digits
  let id = Math.floor(Math.random() * 1000000000000000);

  useEffect(() => {
    if (currentUser) {
      quizzesRef.current = ref(database, "/quizzes/" + currentUser.uid);
    }
  }, [currentUser, database, quizzesRef]);
  
  // change language button onclick function
  const changeLanguageButton = (lang) => {
    changeLanguage(lang.title === "ENGLISH" ? "en" : lang.title === "УКРАЇНСЬКА" ? "ua" : "pl")
    toggleMenu();
  }

  // save test to database function
  const save = async () => {
    if (!editId) {
      // onValue
      onValue(quizzesRef.current, (snapshot) => {
        const data = snapshot.val();
  
        if (data) {
          const quizzesData = Object.values(data);
  
          // check if code is equal to any id in quizzesData
          const checkCode = quizzesData.filter(quiz => quiz.value.id === id);
  
          // if checkCode is true generate another id
          if (checkCode) {
            id = Math.floor(Math.random() * 1000000000000000);
          }
  
          // if id is less than 15 digits generate another id
          if (id < 100000000000000) {
            id = Math.floor(Math.random() * 1000000000000000);
          }
        }
      })

      // push question to database
      if (quizzesRef.current) {
        try {
          await push(quizzesRef.current, {
            value: {
              id: id,
              title: title,
              description: description,
              questions: questions
            }
          });

          // navigate to /
          navigate('/');
        }

        catch (error) {
          console.log(error);
        }
      }
    } else {
      // find the quiz with the same id and update it
      updateQuizData(editId, currentUser, description, title, questions);

      // navigate to /
      navigate("/");
    }
  }

  function updateQuizData(editId, currentUser, description, title, questions) {
    const quizzesRef = ref(database, `quizzes/${currentUser.uid}`);
  
    // Use get() to read the data once without continuous listening
    get(quizzesRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const quizzesKeys = Object.keys(data);
        const quizzes = Object.values(data);
  
        // Find the index of the quiz to be updated
        const selectedQuizIndex = quizzes.findIndex(item => item.value.id === editId);
  
        // If the quiz to be updated is found
        if (selectedQuizIndex !== -1) {
          const selectedQuizKey = quizzesKeys[selectedQuizIndex];
  
          // Update the quiz data
          update(ref(database, `quizzes/${currentUser.uid}/${selectedQuizKey}`), {
            value: {
              description: description,
              id: editId,
              title: title,
              questions: questions
            }
          });
        }
      }
    });
  }

  return (
    <header className="header">
      {/* Logo */}
      <Link to={"/"} className="logo">
        <svg width="24" height="25" viewBox="0 0 30 32" className="k-logo">
          <title>K!</title>
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path d="M0,3.12411067 L5.3201581,1.75968379 L5.30711462,12.5774704 L14.2901186,3.91304348 L18.9106719,5.68853755 L12.3814229,12.9316206 L16.7118577,28.7075099 L12.013834,28.7075099 L8.5486166,16.6209486 L5.27588933,19.8256917 L5.3201581,28.7075099 L0,28.5173913 L0,3.12411067 Z M22.8873518,29.9964427 L24.2067194,26.8901186 L27.2715415,26.8901186 L28.4312253,30.2988142 L25.6794466,31.944664 L22.8873518,29.9964427 Z M29.8806324,1.81146245 L26.2513834,25.1272727 L20.4770751,-1.77635684e-15 L29.8806324,1.81146245 Z" fill="#46178F"></path>
          </g>
        </svg>
      </Link>

      {/* Navigation */}
      <nav className="nav">
        <ul className="nav__list">
          {!currentUser && isDisplayed && navButtons.map((button, index) => (
            <li key={index} className="nav__item">
              <Link to={button.path} className={`nav__link ${button.background ? 'nav__link--background' : ''}`}>
                <span className="link__text">
                  {language === 'en' ? button.en : language === 'ua' ? button.ua : button.pl}
                </span>
              </Link>
            </li>
          ))}

          {/* Change user's settings button */}
          {!settings && !creatingTest && !playing && currentUser && (
            <SettingsButton />
          )}

          {/* Change language button */}
          {!creatingTest && (
              <ChangeLanguage
                languages={languages}
                changeLanguageButton={changeLanguageButton}
                toggleMenu={toggleMenu}
              />  
            )
          }

          {/* settings button */}
          {creatingTest && currentUser && (
            <li className="nav__item">
              <button className="nav__link nav__link--settings" onClick={() => setOpenSettings(true)}>
                <span className="link__text">
                  <img src={SettingsIcon} alt="settings icon" />
                </span>
              </button>
            </li>
          )}

          {/* save quiz button */}
          {creatingTest && currentUser && (
            <li className="nav__item">
              <button 
                className={`nav__link nav__link--save ${
                  title !== "" && 
                  description !== "" &&
                  questions.length !== 0 &&
                  questions.every((question) => question.question !== "" && question.answers.every((answer) => answer !== "")) &&
                  questions.every((question) => question.correctAnswers.length !== 0)
                  ? '' : 'disabled'
                }`} 
                onClick={save}
              >
                <span className="link__text">
                  {language === 'en' ? 'Save' : language === 'ua' ? 'Зберегти' : 'Zapisz'}
                </span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    opened: state.opened
  };
};
 
export default connect(mapStateToProps, { changeLanguage, toggleMenu })(Header);