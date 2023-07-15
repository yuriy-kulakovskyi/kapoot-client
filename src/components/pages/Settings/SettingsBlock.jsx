import React from 'react';

const SettingsBlock = ({ username, setUsername, nickname, setNickname, email, setEmail, language }) => {
  return (
    <div className='settings__inputs'>
      {/* username */}
      <div className='settings__input'>
        <label htmlFor='username'>
          {/* according to the chosen language display text */}
          {language === 'en' ? 'Username' : language === 'ua' ? 'Ім\'я користувача' : 'Nazwa użytkownika'}
        </label>
        <input
          type='text'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* nickname */}
      <div className="settings__input">
        <label htmlFor='nickname'>
          {/* according to the chosen language display text */}
          {language === 'en' ? 'Nickname' : language === 'ua' ? 'Нікнейм' : 'Pseudonim'}
        </label>
        <input
          type='text'
          name='nickname'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      {/* email */}
      <div className="settings__input">
        <label htmlFor='email'>
          {/* according to the chosen language display text */}
          {language === 'en' ? 'Email' : language === 'ua' ? 'Email' : 'Email'}
        </label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SettingsBlock;
