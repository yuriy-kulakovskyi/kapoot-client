// Hooks
import React, { useRef, useState } from 'react';

// useAuth
import { useAuth } from '../../../contexts/AuthContext';

// auth
import { auth } from '../../../firebase';

// Link from react-router-dom
import { Link, useNavigate } from 'react-router-dom';

// connect from redux
import { connect } from 'react-redux';

// Header component link
import Header from "../../Header";

// text.json
import text from './text.json';

// styles
import '../../../styles/Login.css';

const Login = ({ language }) => {
  // constants
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(auth, emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (err) {
      setError(
        language === "en" ? text.texts[0].errors[0].en : language === "ua" ? text.texts[0].errors[0].ua : text.texts[0].errors[0].pl
      );
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <div className='login'>
      {/* Header */}
      <Header 
        isDisplayed={false}
      />

      <div className="login__container">
        {/* Title */}
        <h1 className='container__title'>
          Kapoot!
        </h1>

        {/* display error */}
        {error && <h1 className='container__error'>{error}</h1>}

        {/* Form */}
        <form className='container__form' onSubmit={handleSubmit}>
          <input
            type="email"
            ref={emailRef}
            placeholder={
              language === "en" ? text.texts[0].inputs[0].en : language === "ua" ? text.texts[0].inputs[0].ua : text.texts[0].inputs[0].pl
            }
            className="form__input"
            required
          />

          <input
            type="password"
            ref={passwordRef}
            placeholder={
              language === "en" ? text.texts[0].inputs[1].en : language === "ua" ? text.texts[0].inputs[1].ua : text.texts[0].inputs[1].pl
            }
            className="form__input"
            required
          />

          <button
            type='submit'
            disabled={loading}
            className='form__button'
          >
            {language === "en" ? text.texts[0].buttons[0].en : language === "ua" ? text.texts[0].buttons[0].ua : text.texts[0].buttons[0].pl}
          </button>
        </form>

        {/* Need an account */}
        <div className='need-account'>
          <p>
            {language === "en" ? text.texts[0].links[0].en : language === "ua" ? text.texts[0].links[0].ua : text.texts[0].links[0].pl}
          </p>
          <Link to='/signup' className='signup-link'>
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

export default connect(mapStateToProps)(Login);