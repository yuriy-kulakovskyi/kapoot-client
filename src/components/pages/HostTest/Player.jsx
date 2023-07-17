import React from 'react';

const Player = ({ name, score }) => {
  return (
    <li className='players__player'>
      <h1 className='player__name'>{name}</h1>
      <p className='player__score'>{score}</p>
    </li>
  );
}

export default Player;
