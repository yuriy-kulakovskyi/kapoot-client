import React from 'react';

// Aside component
import Aside from '../../Aside';

// Header component
import Header from '../../Header';
import LibMain from './LibMain';

const Library = () => {
  return (
    <section className='library'>
      {/* Header */}
      <Header />

      {/* Aside */}
      <Aside
        active={"library"}
      />

      {/* Main */}
      <LibMain />
    </section>
  );
}

export default Library;
