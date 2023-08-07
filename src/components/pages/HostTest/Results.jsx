import React, { useEffect, useState, useRef } from 'react';

// useLocation
import { useLocation } from "react-router-dom";

// onValue
import { onValue } from "firebase/database";

// firebase
import { ref, getDatabase } from "firebase/database";

// styles
import '../../../styles/HostTest/Results.css';

// Player component
import Player from './Player';

const Results = () => {
  const location = useLocation();

  const { title, code } = location.state;

  // database
  const database = getDatabase();
  const gamesRef = useRef();
  const playersRef = useRef();

  // useEffect
  useEffect(() => {
    gamesRef.current = ref(database, "/games");
    playersRef.current = ref(database, "/players");
  }, [database, playersRef]);


  // players state
  const [players, setPlayers] = useState([]);

  // useEffect
  useEffect(() => {
    onValue(playersRef.current, (snapshot) => {
      const data = snapshot.val();
  
      if (data) {
        const playersData = Object.values(data);
  
        const filteredPlayers = playersData.filter((player) => {
          return player.value.game === code.toString();
        });

        // sort filteredPlayers by score
        filteredPlayers.sort((a, b) => {
          return b.value.score - a.value.score;
        });
  
        setPlayers(filteredPlayers);
      }
    });
  }, [playersRef, setPlayers, code]);
  

  return (
    <section className='results'>
      {/* independent square and circle */}
      <div className='results__square'></div>
      <div className='results__circle'></div>

      <div className="results__wrap">
        {title && <h1 className='results__quiz-title'>{title}</h1>}

        {code && <h2 className='results__quiz-code'>{code}</h2>}
      </div>


      <ul className="results__players">
        {players && players.map((player) => {
          return (
            <Player
              key={player.value.name}
              name={player.value.name}
              score={player.value.score}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default Results;
