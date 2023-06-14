import React from 'react';

// connect function from React Redux
import { connect } from "react-redux";

const ChangeLanguage = ({ toggleMenu, languages, changeLanguageButton, language, opened }) => {
  return (
    <>
      {/* Language switch button */}
      <li className="nav__item">
        <button className="nav__link nav__link--language" onClick={() => toggleMenu()}>
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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    opened: state.opened
  };
};

export default connect(mapStateToProps)(ChangeLanguage);
