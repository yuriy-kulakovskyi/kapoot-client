import React from 'react';

// Header component link
import Header from "./Header";

// Main Home component link
import Main from "./Main";

const Home = () => {
  return (
    <section className='home'>
      {/* Header */}
      <Header />

      {/* Main */}
      <Main />
    </section>
  );
}

export default Home;
