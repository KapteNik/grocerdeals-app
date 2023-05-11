import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import React from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ChangeUsernameForm = () => {
  const history = useHistory();

  const newUsernameInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    // event.target.reset();

    const enteredNewUsername = newUsernameInputRef.current.value;

    // add validation

    fetch("http://localhost:3000/api/v1/users/updateMe", {
      method: "PATCH",
      body: JSON.stringify({
        idToken: authCtx.token,
        name: enteredNewUsername,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // assumption: Always succeeds!
      if (res.ok) {
        alert("Username Changed Successfully!");
        authCtx.getUsername(enteredNewUsername);
        event.target.reset();
      } else {
        // console.log(res);
      }
      // history.replace('/');
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-username">New Username</label>
        <input
          type="username"
          id="new-username"
          minLength="7"
          ref={newUsernameInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Username</button>
      </div>
    </form>
  );
};

export default ChangeUsernameForm;
