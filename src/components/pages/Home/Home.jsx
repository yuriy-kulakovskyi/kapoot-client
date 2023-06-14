import React from 'react';

// Header component link
import Header from "../../Header";

// Main Home component link
import Main from "./Main";

// Dashboard component link
import Dashboard from "../Dashboard/Dashboard";

// useAuth
import { useAuth } from '../../../contexts/AuthContext';

const Home = () => {
  // useAuth
  const { currentUser } = useAuth();

  return (
    <section className='home'>
      {/* Header */}
      <Header
        isDisplayed={true}
      />
      
      {currentUser ? <Dashboard /> : <Main />}
    </section>
  );
}

export default Home;
