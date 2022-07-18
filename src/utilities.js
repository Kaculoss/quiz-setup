import React, { createContext, useContext, useReducer } from "react";

export const initialState = {
  waiting: true,
  loading: false,
  questions: [],
  error: false,
  modal: false,
  api_endpoint: "https://opentdb.com/api.php?",
  table: {
    sports: 21,
    history: 23,
    politics: 24,
  },
  quiz: {
    amount: 10,
    category: "sports",
    difficulty: "easy",
  },
};

const dataContext = createContext();

export const DataLayer = ({ initialState, reducer, children }) => {
  return (
    <dataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </dataContext.Provider>
  );
};

export const useData = () => useContext(dataContext);

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_QUIZ_AMOUNT":
      return { ...state, quiz: { ...state.quiz, amount: action.amount } };

    case "UPDATE_QUIZ_CATEGORY":
      return { ...state, quiz: { ...state.quiz, category: action.category } };

    case "UPDATE_QUIZ_DIFFICULTY":
      return {
        ...state,
        quiz: { ...state.quiz, difficulty: action.difficulty },
      };

    case "SET_LOADING_TRUE":
      return { ...state, loading: true };

    case "SET_LOADING_FALSE":
      return { ...state, loading: false };

    case "SET_WAITING_TRUE":
      return { ...state, waiting: true };

    case "SET_WAITING_FALSE":
      return { ...state, waiting: false };

    case "SET_ERROR_TRUE":
      return { ...state, error: true };

    case "SET_ERROR_FALSE":
      return { ...state, error: false };

    case "SET_MODAL_TRUE":
      return { ...state, modal: true };

    case "SET_MODAL_FALSE":
      return { ...state, modal: false };

    case "SET_QUESTIONS":
      return { ...state, questions: action.questions };

    default:
      return state;
  }
};
