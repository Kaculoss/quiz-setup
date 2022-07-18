import React from "react";
import { useData } from "./utilities";

export const Modal = ({ correct, setCorrect }) => {
  const [{ modal, questions }, dispatch] = useData();

  const closeModal = () => {
    dispatch({ type: "SET_WAITING_TRUE" });
    setCorrect(0);
    dispatch({ type: "SET_MODAL_FALSE" });
  };

  return (
    <div className={`${modal ? "modal-container isOpen" : "modal-container"}`}>
      <div className="modal-content">
        <h2>congrats!</h2>
        <p>
          You answered {((correct / questions.length) * 100).toFixed(0)}% of the
          questions correctly
        </p>
        <button className="close-btn" onClick={closeModal}>
          play again
        </button>
      </div>
    </div>
  );
};
