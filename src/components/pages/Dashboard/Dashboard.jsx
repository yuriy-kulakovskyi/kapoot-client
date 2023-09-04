import React, { useState } from 'react';

// useAuth
import { useAuth } from '../../../contexts/AuthContext';

// useNavigate
import { useNavigate } from 'react-router-dom';

// User component
import User from './User';

// firebase
import { getDatabase, ref } from "firebase/database";

// Aside component
import Aside from '../../Aside';

// styles
import "../../../styles/Dashboard/Dashboard.css";

// Host component
import Host from './Host';

// Quizzes component
import Quizzes from './Quizzes';

// Games component
import Games from './Games';

// text.json
import text from './text.json';

// connect
import { connect } from 'react-redux';

const Dashboard = ({ language }) => {
  // error state
  const [error, setError] = useState('');

  // values from useAuth
  const { 
    currentUser, 
    logout
   } = useAuth();

   // database
  const database = getDatabase();
  const userRef = ref(database, "/quizzes/" + currentUser.uid);

  // navigate
  const navigate = useNavigate();

  // logount function
  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate('/login');
    } catch {
      setError(
        language === "en" ? text.errors[0].en : language === "ua" ? text.errors[0].ua : text.errors[0].pl
      );
    }
  }
  
  return (
    <section className='dashboard'>
      {/* aside */}
      <Aside
        active={'home'}
      />

      {/* dashboard container */}
      <div className="dashboard__container">

        {/* host a kapoot block */}
        <div className="container__host">
          {/* Host */}
          <Host />
        </div>

        {/* display user's quizes */}
        <div className="container__quizzes">
          {/* Quizes */}
          <Quizzes />
        </div>

        <div className="container__games">
          {/* Games */}
          <Games
            language={language}
          />
        </div>

        {/* Display the user's data */}
        <div className="container__user">
          {currentUser 
            ? 
            // Display the user's data if the user is found
            <User 
              error={error}
              currentUser={currentUser}
              handleLogout={handleLogout}
              quizzesRef={userRef}
            />

            // Display error if user is not found
            : <h1 className='user__not-found'>
                {language === "en" ? text.errors[2].en : language === "ua" ? text.errors[2].ua : text.errors[2].pl}
            </h1>
          }
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language
  };
};

export default connect(mapStateToProps)(Dashboard);
