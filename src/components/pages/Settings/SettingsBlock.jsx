import React from 'react';

const SettingsBlock = ({ username, nickname, setNickname, email, language }) => {
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
          readOnly
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
          onChange={(e) => setNickname(e.target.value)}
          value={nickname}
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
          readOnly
        />
      </div>
    </div>
  );
}

export default SettingsBlock;
