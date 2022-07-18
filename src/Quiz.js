import React, { useState } from "react";
import { useData } from "./utilities";

export const Quiz = ({ correct, setCorrect }) => {
  const [{ questions }, dispatch] = useData();
  const [index, setIndex] = useState(0);

  const { question, incorrect_answers, correct_answer } = questions[index];
  let answers = [...incorrect_answers];

  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((prevState) => prevState + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    setIndex((prevState) => {
      const ind = prevState + 1;
      if (ind > questions.length - 1) {
        dispatch({ type: "SET_MODAL_TRUE" });
        return 0;
      } else {
        return ind;
      }
    });
  };

  return (
    <section className="quiz">
      <p className="correct-answers">
        correct answers: {correct}/{index}
      </p>
      <article className="container">
        <h2 dangerouslySetInnerHTML={{ __html: question }} />
        <div className="btn-container">
          {answers.map((answer, index) => {
            return (
              <button
                key={index}
                dangerouslySetInnerHTML={{ __html: answer }}
                onClick={() => checkAnswer(correct_answer === answer)}
                className="answer-btn"
              />
            );
          })}
        </div>
      </article>
      <button className="next-question" onClick={nextQuestion}>
        next question
      </button>
    </section>
  );
};
