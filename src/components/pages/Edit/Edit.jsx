import React, { useEffect } from 'react';

// location state
import { useLocation } from "react-router-dom";

// useNavigate
import { useNavigate } from "react-router-dom";

const Edit = () => {
  // location
  const location = useLocation();

  // get title from location state
  const { title, description, questions } = location.state;

  // useNavigate
  const navigate = useNavigate();

  // if title is undefined navigate to dashboard
  useEffect(() => {
    title === undefined && navigate("/dashboard");
  }, [title, navigate]);

  return (
    <div>
      {title}
      {description}
      {questions.map((question, key) => {
        return (
          <div key={key}>
            {question.question}
            {question.answers[question.correctAnswers[0]]}
          </div>
        )})
      }
    </div>
  );
}

export default Edit;
