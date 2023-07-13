import React from 'react';

// Header component
import Header from '../../Header';

const Footer = ({ nickname, score, progress, questionsLength }) => {
  return (
    <footer className={progress === 100 ? "game__footer fullScreen" : "game__footer"} style={{height: progress === 100 && "100%"}}>
      {/* Header */}
      {progress === 100 && <Header />}

      {progress < 100 && <p className="game__footer-text">{nickname}</p>}

      {/* Score */}
      <div className="game__footer-score">
        <p className="game__footer-score-number">{score}{progress === 100 && "/" + questionsLength * 1000}</p>
      </div>
    </footer>
  );
}

export default Footer;
