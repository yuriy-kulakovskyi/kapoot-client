import React, { useState } from 'react';

// Header component link
import Header from '../../Header';

// Aside component link
import Aside from '../../Aside';

// SettingsBlock component link
import SettingsBlock from './SettingsBlock';

// connect to redux
import { connect } from 'react-redux';

// styles
import '../../../styles/Settings/Settings.css';

// AuthContext
import { useAuth } from '../../../contexts/AuthContext';

// auth
import { auth } from '../../../firebase';

const Settings = ({ language }) => {
  // useAuth
  const { currentUser, updateprofile } = useAuth();

  // username state
  const [username, setUsername] = useState(
    // if user is logged in display his email until @
    currentUser.email.split("@")[0]
    || "");

  // nickname state
  const [nickname, setNickname] = useState(
    // if user is logged in display his display name
    currentUser.displayName
    || ""
  );

  // email state
  const [email, setEmail] = useState(
    // if user is logged in display his email
    currentUser.email
    || ""
  );

  // state to check whether inputs were changed
  let isChanged = false;

  // check if inputs were changed
  if (username !== currentUser.email.split("@")[0] || nickname !== currentUser.displayName || email !== currentUser.email) {
    isChanged = true;
  }

  // change user info
  const changeUserInfo = async () => {
    // update profile
    await updateprofile(auth.currentUser, { username: username, displayName: nickname, email: email });

    // reload page
    window.location.reload();
  }

  // return
  return (
    <section className="settings">
      {/* Header */}
      <Header
        settings={true}
      />

      {/* Aside */}
      <Aside />

      {/* title */}
      <h1 className='settings__title'>
        {/* according to the chosen language display text */}
        {language === 'en' ? 'Settings' : language === 'ua' ? 'Налаштування' : 'Ustawienia'}
      </h1>

      {/* user info */}
      <div className="settings__userInfo">

        {/* user info row */}
        <div className="settings__userInfo-row">
          {/* Title */}
          <h1 className="userInfo-row__title">
            {/* according to the chosen language display text */}
            {language === 'en' ? 'User Information' : language === 'ua' ? 'Інформація про користувача' : 'Informacje o użytkowniku'}
          </h1>

          {/* save button */}
          <button
            className="userInfo-row__save-btn"
            disabled={!isChanged}
            onClick={changeUserInfo}
          >
            {/* according to the chosen language display text */}
            {language === 'en' ? 'Save' : language === 'ua' ? 'Зберегти' : 'Zapisz'}
          </button>
        </div>

        {/* settings */}
        <SettingsBlock
          username={username}
          setUsername={setUsername}
          nickname={nickname}
          setNickname={setNickname}
          email={email}
          setEmail={setEmail}
          language={language}
        />
      </div>
    </section>
  );
}

// map state to props
const mapStateToProps = (state) => {
  return {
    language: state.language
  }
};

export default connect(mapStateToProps)(Settings);
