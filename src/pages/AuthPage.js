import LoginForm from "../components/Auth/LoginForm";
import React, { useState } from "react";
import SignupForm from "../components/Auth/SignupForm";

const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <div className="App">
      {currentForm === "login" ? (
        <LoginForm onFormSwitch={toggleForm} />
      ) : (
        <SignupForm onFormSwitch={toggleForm} />
      )}
    </div>
  );
};

export default AuthPage;
