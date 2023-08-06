import React from 'react';

const DisplayResult = ({ isCorrect, language }) => {
  return (
    <section className='display-result'>
      <h1 className="display-result__result">
        {isCorrect ? 
          language === 'en' ? "Correct" :
          language === 'ua' ? "Правильно" :
          "Prawidłowy"
            : 
          language === 'en' ? "Wrong" :
          language === 'ua' ? "Помилка" :
          "Nie poprawnie"
        }
      </h1>

      {isCorrect ? 
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><g fill="none" fill-rule="evenodd"><g><g><g><g transform="translate(-703 -1807) translate(536 1581) translate(46 170) translate(121 56)"><circle cx="40" cy="40" r="37.895" fill="#66BF39" stroke="#FFF" stroke-width="4.211"></circle><g fill="#FFF" fill-rule="nonzero" stroke="#000" stroke-opacity="0.15" stroke-width="2.105"><path d="M46.244 15.355l8.127 7.393-25.623 28.184-15.526-14.483 7.743-7.747 7.333 6.396 17.946-19.743z" transform="translate(6.316 6.316) rotate(-3 33.81 33.138)"></path></g></g></g></g></g></g></svg>
          :
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><g fill="none" fill-rule="evenodd"><g><g><g><g transform="translate(-257 -1827) translate(90 1581) translate(47 190) translate(120 56)"><circle cx="40" cy="40" r="37.895" fill="#F35" stroke="#FFF" stroke-width="4.211"></circle><g fill="#FFF" fill-rule="nonzero" stroke="#000" stroke-opacity="0.15" stroke-width="2.105"><path d="M39.99 12.621v14.736l14.736.001V39.99H39.99v14.736H27.359V39.99H12.62V27.359h14.736l.001-14.737H39.99z" transform="translate(6.316 6.316) rotate(-135 33.674 33.674)"></path></g></g></g></g></g></g></svg>
      }
    </section>
  );
}

export default DisplayResult;
