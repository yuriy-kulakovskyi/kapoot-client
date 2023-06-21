import React from 'react';

// react-router-dom
import { Link } from 'react-router-dom';

// user.svg
import user from '../assets/svg/user.svg';

const SettingsButton = () => {
  return (
    <li className="nav__item  nav__settings">
      <Link to="/settings" className="nav__link">
        <span className="settings__user">
          <img src={user} alt="User Icon" className="user__image" />
        </span>
      </Link>
    </li>
  );
}

export default SettingsButton;
