import React, { useState, useEffect, useCallback } from "react";

//This is created using React.createContext().
//It defines the initial shape and values of the context's data.
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  isAdmin: false,
  username: "",
  userId: "",
  getUsername: (name) => {},
  getUserId: (id) => {},
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

//: These functions retrieve the stored data from the browser's local storage.
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

const retrieveStoredUserId = () => {
  console.log(localStorage.getItem("userId"));
  return localStorage.getItem("userId");
};

// This is the main component that wraps the child components
// and provides the authentication context. It initializes the initial
// values for the context state variables using the retrieved data from local storage.

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  const storedUsername = retrieveStoredUsername();
  const storedRole = retrieveStoredRole();
  const storedUserId = retrieveStoredUserId();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  let initialUsername;
  if (storedUsername) {
    initialUsername = storedUsername;
  }

  let initialUserId;
  if (storedUserId) {
    initialUserId = storedUserId;
  }

  let initialRole;
  if (storedRole) {
    initialRole = storedRole;
  }

  const [token, setToken] = useState(initialToken);
  const [admin, setAdmin] = useState(initialRole);
  const [username, setUsername] = useState(initialUsername);
  const [userid, setUserId] = useState(initialUserId);

  const userIsLoggedIn = !!token;
  const userIsAdmin = admin;
  const usersName = username;
  const userId = userid;
  console.log(userId);

  const logoutHandler = useCallback(() => {
    setToken(null);
    setAdmin(null);
    setUsername(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

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
    if (role === "admin") {
      setAdmin(true);
    }
    localStorage.setItem("role", role);
  };

  const usernameHandler = (name) => {
    setUsername(name);
    localStorage.setItem("username", name);
  };

  const userIdHandler = (id) => {
    setUserId(id);
    localStorage.setItem("userId", id);
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
    userId: userId,
    getUsername: usernameHandler,
    getUserId: userIdHandler,
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
