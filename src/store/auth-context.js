import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  isAdmin: false,
  username: "",
  getUsername: (name) => {},
  admin: (role) => {},
  login: (token) => {},
  logout: () => {},
});

// const calculateRemainingTime = (expirationTime) => {
//   const currentTime = new Date().getTime();
//   const adjExpirationTime = new Date(expirationTime).getTime();
//   const remainingDuration = adjExpirationTime - currentTime;
//   return remainingDuration;
// };

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  // const storedExpirationDate = localStorage.getItem('expirationTime');
  // const remainingTime = calculateRemainingTime(storedExpirationDate);
  // if (remainingTime <= 3600) {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('expirationTime');
  //   return null;
  // }

  return {
    token: storedToken,
    // duration: remainingTime,
  };
};

const retrieveStoredUsername = () => {
  return localStorage.getItem("username");
};

const retrieveStoredRole = () => {
  return localStorage.getItem("role");
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  const storedUsername = retrieveStoredUsername();
  const storedRole = retrieveStoredRole();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  let initialUsername;
  if (storedUsername) {
    initialUsername = storedUsername;
  }

  let initialRole;
  if (storedRole) {
    initialRole = storedRole;
  }

  const [token, setToken] = useState(initialToken);
  const [admin, setAdmin] = useState(initialRole);
  const [username, setUsername] = useState(initialUsername);

  const userIsLoggedIn = !!token;
  const userIsAdmin = admin;
  const usersName = username;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setAdmin(null);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    // localStorage.removeItem('expirationTime');
    // if (logoutTimer) {
    //   clearTimeout(logoutTimer);
    // }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    // localStorage.setItem('expirationTime', expirationTime);
    // const remainingTime = calculateRemainingTime(expirationTime);
    // logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const adminHandler = (role) => {
    if (role) {
      setAdmin(role);
    }
    localStorage.setItem("role", role);
  };

  const usernameHandler = (name) => {
    setUsername(name);
    localStorage.setItem("username", name);
  };

  // useEffect(() => {
  //   if (tokenData) {
  //     console.log(tokenData.duration);
  //     logoutTimer = setTimeout(logoutHandler, tokenData.duration);
  //   }
  // }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isAdmin: userIsAdmin,
    isLoggedIn: userIsLoggedIn,
    username: usersName,
    getUsername: usernameHandler,
    admin: adminHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
