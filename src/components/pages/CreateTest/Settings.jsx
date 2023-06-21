import React, { useState } from 'react';

// styles
import '../../../styles/CreateTest/Settings.css';

const Settings = ({ setOpenSettings, language, setTitle, setDescription, title, description }) => {
  // title state
  const [titleInp, setTitleInp] = useState(title || '');

  // description state
  const [descriptionInp, setDescriptionInp] = useState(description || '');

  // save function
  const save = () => {
    // close settings
    setOpenSettings(false);
    
    // set test's title and description
    setTitle(titleInp);
    setDescription(descriptionInp);
  };

  return (
    <section className='settings'>
      <h1 className="settings__title">
        {language === 'en' ? "Kapoot summary" : language === "ua" ? "Огляд капуту" : "Podsumowanie kaputu"}
      </h1>

      <div className="settings__wrapper">
        <div className="input">
          {/* label */}
          <label className="settings__label">
            {language === 'en' ? "Title" : language === "ua" ? "Назва" : "Tytuł"}
          </label>

          {/* input which holds the title */}
          <input 
            type="text" 
            className='settings__input'
            placeholder=
              {language === 'en' ? "Enter title" : language === "ua" ? "Введіть назву" : "Wprowadź tytuł"}
            value={titleInp}
            onChange={(e) => setTitleInp(e.target.value)}
          />
        </div>

        <div className="input">
          {/* label */}
          <label className="settings__label">
            {language === 'en' ? "Description" : language === "ua" ? "Опис" : "Opis"}
          </label>

          {/* textarea which holds the description */}
          <textarea
            className='settings__textarea'
            placeholder={
              language === 'en' ? "Enter description" : language === "ua" ? "Введіть опис" : "Wprowadź opis"
            }
            value={descriptionInp}
            onChange={(e) => setDescriptionInp(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* footer with buttons */}
      <footer className="settings__footer">
        <button className="settings__button settings__cancel" onClick={() => setOpenSettings(false)}>
          {language === 'en' ? "Cancel" : language === "ua" ? "Скасувати" : "Anuluj"}
        </button>
        <button className="settings__button settings__done" onClick={save}>
          {language === 'en' ? "Done" : language === "ua" ? "Готово" : "Gotowe"}
        </button>
      </footer>
    </section>
  );
}

export default Settings;