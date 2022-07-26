import axios from "axios";
import React from "react";
import { useData } from "./utilities";

export const SetupForm = () => {
  const [{ quiz, error, api_endpoint, table }, dispatch] = useData();

  const getQuestions = async (url) => {
    dispatch({ type: "SET_LOADING_TRUE" });
    dispatch({ type: "SET_WAITING_FALSE" });

    const resp = await axios(url).catch((err) => console.log(err));
    if (resp) {
      const data = resp.data.results;
      if (data.length > 0) {
        dispatch({ type: "SET_QUESTIONS", questions: data });
        dispatch({ type: "SET_LOADING_FALSE" });
        dispatch({ type: "SET_WAITING_FALSE" });
        dispatch({ type: "SET_ERROR_FALSE" });
      } else {
        dispatch({ type: "SET_WAITING_TRUE" });
        dispatch({ type: "SET_ERROR_TRUE" });
      }
    } else {
      dispatch({ type: "SET_WAITING_TRUE" });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "amount") {
      dispatch({ type: "UPDATE_QUIZ_AMOUNT", amount: value });
    } else if (name === "category") {
      dispatch({ type: "UPDATE_QUIZ_CATEGORY", category: value });
    } else if (name === "difficulty") {
      dispatch({ type: "UPDATE_QUIZ_DIFFICULTY", difficulty: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;

    const url = `${api_endpoint}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    getQuestions(url);
  };

  return (
    <main>
      <section className="quiz quiz-small">
        <form action="" className="setup-form">
          <h2>setup quiz</h2>
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="form-input"
              min={1}
              max={50}
              value={quiz.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label htmlFor="category">category</label>
            <select
              name="category"
              id="category"
              className="form-input"
              value={quiz.category}
              onChange={handleChange}
            >
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="difficulty">difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>

          {error && (
            <p className="error">
              can't generate questions, please try different options
            </p>
          )}

          <button type="submit" onClick={handleSubmit} className="submit-btn">
            start
          </button>
        </form>
      </section>
    </main>
  );
};
