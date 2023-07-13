import React from 'react';
import { useLocation } from "react-router-dom";

// styles
import '../../../styles/HostTest/Results.css';

const Results = () => {
  const location = useLocation();
  
  const { title, code } = location.state;

  return (
    <section className='results'>
      {/* independent square and circle */}
      <div className='results__square'></div>
      <div className='results__circle'></div>

      <div className="results__wrap">
        {title && <h1 className='results__quiz-title'>{title}</h1>}

        {code && <h2 className='results__quiz-code'>{code}</h2>}
      </div>
    </section>
  );
}

export default Results;
