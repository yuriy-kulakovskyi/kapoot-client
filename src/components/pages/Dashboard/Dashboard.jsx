import React, { useState } from 'react';

// useAuth
import { useAuth } from '../../../contexts/AuthContext';

// firebase
import { getDatabase, ref, push } from "firebase/database";

// useNavigate
import { useNavigate } from 'react-router-dom';
import User from './User';

// Aside component
import Aside from '../../Aside';

// styles
import "../../../styles/Dashboard/Dashboard.css";

// Host component
import Host from './Host';
import Quizes from './Quizzes';

const Dashboard = () => {
  // error state
  const [error, setError] = useState('');

  // values from useAuth
  const { 
    currentUser, 
    logout
   } = useAuth();

   // database
   const database = getDatabase();
   const userRef = ref(database, "quizes/" + currentUser.uid);

  // navigate
  const navigate = useNavigate();

  // logount function
  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate('/login');
    } catch {
      setError("Failed to log out");
    }
  }

  // updateTest function
  async function updateTest() {
    setError("");

    try {
      await push(userRef, "new quiz");
    } catch {
      setError("Failed to update the quiz");
    }
  };
  
  return (
    <section className='dashboard'>
      {/* aside */}
      <Aside
        active={'home'}
      />

      {/* dashboard container */}
      <div className="dashboard__container">
        {/* Display the user's data */}
        <div className="container__user">
          {currentUser 
            ? 
            // Display the user's data if the user is found
            <User 
              error={error}
              currentUser={currentUser}
              handleLogout={handleLogout}
              updateTest={updateTest}
              quizzesRef={userRef}
            />

            // Display error if user is not found
            : <h1 className='user__not-found'>Failed to find the user</h1>
          }
        </div>

        {/* host a kapoot block */}
        <div className="container__host">
          {/* Host */}
          <Host
            updateTest={updateTest}
          />
        </div>

        {/* display user's quizes */}
        <div className="container__quizzes">
          {/* Quizes */}
          <Quizes 
            quizzesRef={userRef}
          />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
