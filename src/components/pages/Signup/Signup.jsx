import React, { useRef, useState } from 'react';

// react-router-dom
import { Link, useNavigate } from 'react-router-dom';

// useAuth
import { useAuth } from '../../../contexts/AuthContext';

// auth
import { auth } from '../../../firebase';

// Header component
import Header from '../../Header';

// connect from redux
import { connect } from 'react-redux';

// text.json
import text from './text.json';

// styles
import '../../../styles/Signup.css';

const Signup = ({ language }) => {
  // constants
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const nicknameRef = useRef(null);

  const { signup, updateprofile } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      // According to the language, set the error with the appropriate text from text.json
      return setError(language === "en" ? text.texts[0].errors[0].en : language === "ua" ? text.texts[0].errors[0].ua : text.texts[0].errors[0].pl);
    }

    try {
      setError('');
      setLoading(true);

      // signup
      await signup(auth, emailRef.current.value, passwordRef.current.value);

      // update profile
      await updateprofile(auth.currentUser, { displayName: nicknameRef.current.value });

      navigate('/');
    } catch (err) {
      // According to the language, set the error with the appropriate text from text.json
      setError(language === "en" ? text.texts[0].errors[1].en : language === "ua" ? text.texts[0].errors[1].ua : text.texts[0].errors[1].pl);
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <div className='signup'>
      {/* Header */}
      <Header
        isDisplayed={false}
      />

      <div className="signup__container">
        {/* Title */}
        <h1 className='container__title'>
          Kapoot!
        </h1>

        {/* display error */}
        {error && <h1 className='container__error'>{error}</h1>}

        {/* Form */}
        <form className='container__form' onSubmit={handleSubmit}>

          {/* email input */}
          <input
            type="email"
            ref={emailRef}
            placeholder={
              language === "en" ? text.texts[0].inputs[0].en : language === "ua" ? text.texts[0].inputs[0].ua : text.texts[0].inputs[0].pl
            }
            className='form__input'
            required
          />

          {/* nickname input */}
          <input
            type="text"
            ref={nicknameRef}
            placeholder={
              language === "en" ? text.texts[0].inputs[1].en : language === "ua" ? text.texts[0].inputs[1].ua : text.texts[0].inputs[1].pl
            }
            className='form__input'
            required
          />

          {/* password input */}
          <input
            type="password"
            ref={passwordRef}
            placeholder={
              language === "en" ? text.texts[0].inputs[2].en : language === "ua" ? text.texts[0].inputs[2].ua : text.texts[0].inputs[2].pl
            }
            className='form__input'
            required
          />

          {/* confirm password */}
          <input
            type="password"
            ref={confirmPasswordRef}
            placeholder={
              language === "en" ? text.texts[0].inputs[3].en : language === "ua" ? text.texts[0].inputs[3].ua : text.texts[0].inputs[3].pl
            }
            className='form__input'
            required
          />

          <button
            type='submit'
            disabled={loading}
            className='form__button'
          >
            {/* Accroding to the chosen language display text */}
            {language === "en" ? text.texts[0].buttons[0].en : language === "ua" ? text.texts[0].buttons[0].ua : text.texts[0].buttons[0].pl}
          </button>
        </form>

        {/* Already have an account */}
        <div className='already-have-account'>
          <p>
            {/* Accroding to the chosen language display text */}
            {language === "en" ? text.texts[0].links[0].en : language === "ua" ? text.texts[0].links[0].ua : text.texts[0].links[0].pl}
          </p>

          <Link to='/login' className='login-link'>
            {/* Accroding to the chosen language display text */}
            {language === "en" ? text.texts[0].links[1].en : language === "ua" ? text.texts[0].links[1].ua : text.texts[0].links[1].pl}
          </Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language
  };
};

export default connect(mapStateToProps)(Signup);
