import React from 'react';

// styles
import '../../../styles/Main.css';

// Link from react-router-dom
import { Link } from 'react-router-dom';

// Redux connect function import
import { connect } from "react-redux";

// titles object
const titles = {
  en: "Welcome to Kapoot!",
  ua: "Ласкаво просимо до Kapoot!",
  pl: "Witamy w Kapoot!",
}

// descriptions object
const descriptions = {
  en: "Kapoot is a Kahoot clone that allows you to create and play quizzes with your friends.",
  ua: "Kapoot - це клон Kahoot, який дозволяє створювати та грати в квізи з друзями.",
  pl: "Kapoot to jest klon Kahoota, który pozwala tworzyć i grać w quizy z kolegami."
};

// buttons object
const buttons = {
  en: {
    create: "Create a quiz",
    play: "Play a quiz",
  },
  ua: {
    create: "Створити квіз",
    play: "Грати в квіз",
  },
  pl: {
    create: "Stwórz quiz",
    play: "Graj w quiz",
  }
};

const Main = ({ language }) => {
  return (
    <main className="main">
      <div className="main__text">
        <h3 className="main__text__title">
          {/* According to the "language" constant display title on this language */}
          {language === "en" ? titles.en : language === "ua" ? titles.ua : titles.pl}
        </h3>

        <p className="main__text__paragraph">
          {/* According to the "language" constant display description on this language */}
          {language === "en" ? descriptions.en : language === "ua" ? descriptions.ua : descriptions.pl}
        </p>

        <Link to={"/play-kapoot"} className="main__text__link violet-link">
          {/* According to the "language" constant display button's text on this language */}
          {language === "en" ? buttons.en.play : language === "ua" ? buttons.ua.play : buttons.pl.play}
        </Link>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
};

export default connect(mapStateToProps)(Main);