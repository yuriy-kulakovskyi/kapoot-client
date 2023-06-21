import React from 'react';

const Footer = ({ updateTest, questions }) => {
  return (
    <footer className="footer">
      <p className="footer__text">
        {questions}
      </p>
      <button onClick={() => updateTest()}>+</button>
    </footer>
  );
}

export default Footer;
