import React from 'react';

// styles
import "../styles/Aside.css";

// Link from react-router-dom
import { Link } from 'react-router-dom';

// connect
import { connect } from "react-redux";

const Aside = ({ active, language }) => {
  return (
    <aside className='aside'>
      <ul className="aside__list">
        <li className="aside__item">
          <Link to="/" className="aside__link" style={{backgroundColor: active === "home" && "rgb(242, 242, 242)"}}>
            <span>
              <svg viewBox="0 0 28 28" focusable="false" stroke="none" strokeWidth="0" aria-labelledby="label-a6e0d51f-48b8-46a9-8493-d9c20a5b3150" aria-hidden="true" className="sc-jSUZER eTaWgc"><title id="label-a6e0d51f-48b8-46a9-8493-d9c20a5b3150">
                {/* according to the chosen language, display text */}
                {language === "en" ? "Home" : language === "ua" ? "Головна" : "Główna"}
                </title><path d="M22.4127 12.434L14.5377 6.30899C14.2218 6.06399 13.7791 6.06399 13.4623 6.30899L5.58732 12.434C5.20669 12.7306 5.13757 13.281 5.43507 13.6616C5.73169 14.0431 6.28032 14.1131 6.66269 13.8156L7.00044 13.5531V21.0002C7.00044 21.4832 7.39157 21.8752 7.87544 21.8752H11.3754C11.8584 21.8752 12.2504 21.4832 12.2504 21.0002V15.7502H15.7504V21.0002C15.7504 21.4832 16.1416 21.8752 16.6254 21.8752H20.1254C20.6084 21.8752 21.0004 21.4832 21.0004 21.0002V13.5531L21.3373 13.8156C21.4974 13.9399 21.6873 14.0002 21.8746 14.0002C22.1353 14.0002 22.3934 13.8839 22.5658 13.6616C22.8633 13.281 22.7942 12.7306 22.4127 12.434Z" style={{fill: "rgb(110, 110, 110)"}}></path></svg>
            </span>
            {/* according to the chosen language, display text */}
            {language === "en" ? "Home" : language === "ua" ? "Головна" : "Główna"}
          </Link>
        </li>
        <li className="aside__item">
          <Link to="/library" className="aside__link" style={{backgroundColor: active === "library" && "rgb(242, 242, 242)"}}>
            <span>
              <svg viewBox="0 0 32 32" focusable="false" stroke="none" strokeWidth="0" aria-labelledby="label-bbc97d38-5805-47ac-86be-9305d4577970" aria-hidden="true" className="sc-jSUZER eTaWgc"><title id="label-bbc97d38-5805-47ac-86be-9305d4577970">
                {/* according to the chosen language, display text */}
                {language === "en" ? "Library" : language === "ua" ? "Бібліотека" : "Biblioteka"}
                </title><path d="M8,11 C7.447715,11 7,10.55228 7,10 C7,9.44772 7.447715,9 8,9 C8.552285,9 9,9.44772 9,10 C9,10.55228 8.552285,11 8,11 Z M11,9 L25,9 L25,11 L11,11 L11,9 Z M8,17 C7.447715,17 7,16.55228 7,16 C7,15.44772 7.447715,15 8,15 C8.552285,15 9,15.44772 9,16 C9,16.55228 8.552285,17 8,17 Z M11,15 L25,15 L25,17 L11,17 L11,15 Z M8,23 C7.447715,23 7,22.552285 7,22 C7,21.44772 7.447715,21 8,21 C8.552285,21 9,21.44772 9,22 C9,22.552285 8.552285,23 8,23 Z M11,21 L25,21 L25,23 L11,23 L11,21 Z" style={{fill: "rgb(110, 110, 110)"}}></path></svg>
            </span>
            {/* according to the chosen language, display text */}
            {language === "en" ? "Library" : language === "ua" ? "Бібліотека" : "Biblioteka"}
          </Link>
        </li>
      </ul>
    </aside>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)(Aside);
