import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const SignupForm = (props) => {
  const history = useHistory();
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmedPassword = passwordConfirmInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
  
    fetch('http://localhost:3000/api/v1/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: enteredUsername,
        email: enteredEmail,
        password: enteredPassword,
        passwordConfirm: enteredConfirmedPassword
        // returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          console.log(res)
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
      //   const expirationTime = new Date(
      //     new Date().getTime() + +data.expiresIn * 1000
      //   );
        console.log("From Sign-Up");
        console.log(data.token);
        // authCtx.login(data.token);
        props.onFormSwitch('login')
        // history.replace('/login');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='username'>Your Username</label>
          <input type='text' id='username' required ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='passwordConfirm'>Confirm Password</label>
          <input type='password' id='passwordConfirm' required ref={passwordConfirmInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>Create Account</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={() => props.onFormSwitch('login')}
          >Login with existing account</button>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
