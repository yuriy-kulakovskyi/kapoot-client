import React from 'react';

// styles
import "../../../styles/Dashboard/User.css";

const User = ({ error, currentUser, handleLogout }) => {
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
        Log Out
      </button>
    </div>
  );
}

export default User;
