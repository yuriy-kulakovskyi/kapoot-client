import React, { useEffect, useState } from 'react';

// firebase imports
import { onValue, ref, getDatabase } from 'firebase/database';

// useAuth
import { useAuth } from '../../../contexts/AuthContext';

// Link from react-router-dom
import { Link } from 'react-router-dom';

const Games = ({ language }) => {
  // database
  const database = getDatabase();

  // values from useAuth
  const {
    currentUser
  } = useAuth();

  // games state
  const [games, setGames] = useState([]);

  // useEffect
  useEffect(() => {
    // onValue
    onValue(ref(database, "/games"), (snapshot) => {
      const data = snapshot.val();

      // if data exists
      if (data) {
        setGames(Object.values(data).filter(data => data.value.host === currentUser.uid && data.value.status === "in progress"))
      }
    });
  }, [database, currentUser]);

  return (
    <div className='games box'>
      {/* Title */}
      <h1 className="games__title">
        {/* according to the chosen language, display text */}
        {language === 'en' ? "Active games" : language === 'ua' ? "Активні ігри" : "Aktywne gry"}
      </h1>

      {/* Display active games */}
      {games && games.length > 0 ? <ul className="games__list">
        {games.map((game, index) => {
          return (
            <li className="games__item" key={index}>
              <p className="games__code">{game.value.code}</p>
              <Link 
                to={"host"}
                state={{
                  title: game.value.quiz.title,
                  code: game.value.code,
                }}
                className="games__quiz"
              >
                {game.value.quiz.title}
              </Link>
            </li>
          )
        })}
      </ul>
      : <p className="games__no-games">
          {/* according to the chosen language, display text */}
          {language === 'en' ? "Oops. There's no active games" : language === 'ua' ? "Упсс. Немає активних ігор" : "Ups. Nie masz aktywnych gier"}
        </p>  
    }
    </div>
  );
}

export default Games;
