import React from 'react';

const Player = ({ name, score, point }) => {
  return (
    <li className='players__player'>
      <h1 className='player__name'>{name}</h1>
      <h3 className="player__point">{point.toFixed(1)} / 12</h3>
      <p className='player__score'>{score}</p>
    </li>
  );
}

export default Player;
