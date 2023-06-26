import { useContext } from "react";
import StartingPageContent from "../components/StartingPage/StartingPageContent";
import ReactMapPageContent from "../components/ReactMapPage/ReactMapPageContent";
import AuthContext from "../store/auth-context";
import React from "react";

const HomePage = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      {console.log(authCtx.isLoggedIn)}
      {!authCtx.isLoggedIn && <StartingPageContent />}
      {authCtx.isLoggedIn && <ReactMapPageContent />}
    </div>
  );
};

export default HomePage;
