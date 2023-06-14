import React from 'react';

// styles
import "../../../styles/Dashboard/User.css";

// text.json
import text from './text.json';

// connect
import { connect } from 'react-redux';

const User = ({ error, currentUser, handleLogout, language }) => {
  return (
    <div className="found box">
      <div className="card">
        {error && <h1>{error}</h1>}
        <h2 className="card__nickname">
          {currentUser.displayName}
        </h2>
        <h4 className='card__name'>
          {/* Get all symbols from the beggining of the email to @ */}
          {currentUser.email.slice(0, currentUser.email.indexOf('@'))}
        </h4>
      </div>

      <button 
        onClick={handleLogout}
        className="card__button"
      >
        {/* according to the chosen language, display text */}
        {language === "en" ? text.button.en : language === "ua" ? text.button.ua : text.button.pl}
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language
  };
};

export default connect(mapStateToProps)(User);