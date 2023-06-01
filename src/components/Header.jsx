import React from 'react';

// styles
import '../styles/Header.css';

// Link component from React Router
import { Link } from 'react-router-dom';

// functions import
import { changeLanguage, toggleMenu } from '../actions';

// Redux connect function import
import { connect } from "react-redux";

// navButtons array
const navButtons = [
  {
    en: 'Play',
    ua: 'Грати',
    pl: "Grać",
    path: '/play'
  },

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
]

class Header extends React.Component {
  render() {
    const { language, opened } = this.props;
  
    // change language button onclick function
    const changeLanguageButton = (lang) => {
      this.props.changeLanguage(lang.title === "ENGLISH" ? "en" : lang.title === "УКРАЇНСЬКА" ? "ua" : "pl")
      this.props.toggleMenu();
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
            {navButtons.map((button, index) => (
              <li key={index} className="nav__item">
                <Link to={button.path} className={`nav__link ${button.background ? 'nav__link--background' : ''}`}>
                  <span className="link__text">
                    {language === 'en' ? button.en : language === 'ua' ? button.ua : button.pl}
                  </span>
                </Link>
              </li>
            ))}

            {/* Language switch button */}
            <li className="nav__item">
              <button className="nav__link nav__link--language" onClick={() => this.props.toggleMenu()}>
                {language.toUpperCase()}
              </button>
            </li>

            {/* Languages dropdown list */}
            <ul className="nav__dropdown" style={{display: opened ? "block" : "none"}}>
              {languages.map((lang, index) => (
                <li key={index} className="nav__dropdown-item">
                  <button className="nav__dropdown-link" onClick={() => changeLanguageButton(lang)}>
                    {lang.title.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          </ul>
        </nav>
      </header>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    opened: state.opened
  };
};
 
export default connect(mapStateToProps, { changeLanguage, toggleMenu })(Header);