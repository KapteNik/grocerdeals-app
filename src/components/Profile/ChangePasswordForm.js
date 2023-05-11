import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import React from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ChangePasswordForm = () => {
  const history = useHistory();
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmNewPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    // event.target.reset();

    const enteredOldPassword = oldPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredConfirmedNewPassword = newPasswordInputRef.current.value;

    // add validation

    fetch("http://localhost:3000/api/v1/users/updateMyPassword", {
      method: "PATCH",
      body: JSON.stringify({
        idToken: authCtx.token,
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
        confirmNewPassword: enteredConfirmedNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // assumption: Always succeeds!
      if (res.ok) {
        alert("Password Changed Successfully!");
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
        <label htmlFor="new-password">Οld Password</label>
        <input
          type="password"
          id="old-password"
          minLength="8"
          ref={oldPasswordInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="8"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password">Confirm New Password</label>
        <input
          type="password"
          id="confirm-new-password"
          minLength="8"
          ref={confirmNewPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
