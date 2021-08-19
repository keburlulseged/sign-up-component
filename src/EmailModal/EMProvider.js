import React, { useContext, useState } from "react";
import Cookies from "js-cookie";

export const StateContext = React.createContext();

export function useStateContext() {
  return useContext(StateContext);
}

export function EMProvider({ children }) {
  const [modalOpen, setModalOpen] = useState("false");
  const [email, setEmail] = useState("");
  const [showEmailError, setShowEmailError] = useState("false");
  const [formCompleted, setFormCompleted] = useState("false");

  const openModalAction = () => {
    Cookies.set("modalOpenedBefore", true, { expires: 7 });
    setModalOpen(true);
  };
  const closeModalAction = () => {
    setModalOpen(false);
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const emailIsValid = (text) => {
    return /\S+@\S+\.\S+/.test(text);
  };

  const checkForEmail = (e) => {
    if (!emailIsValid(email)) {
      setShowEmailError(true);
    }
  };
  const removeErrorMessage = (e) => {
    setShowEmailError(false);
  };

  const submittedForm = (e) => {
    e.preventDefault();
    if (showEmailError === false && email.length >5 && emailIsValid(email)) {
      setFormCompleted(true);
      setTimeout(() => {
        closeModalAction();
      }, 3000);
    }
  };

  return (
    <StateContext.Provider
      value={{
        modalOpen,
        email,
        openModalAction,
        closeModalAction,
        handleEmailInput,
        checkForEmail,
        removeErrorMessage,
        showEmailError,
        formCompleted,
        submittedForm,
        emailIsValid,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
