import { useContext } from 'react';
import StartingPageContent from '../components/StartingPage/StartingPageContent';
import ReactMapPageContent from '../components/ReactMapPage/ReactMapPageContent';
import AuthContext from '../store/auth-context';
import React from 'react';

const AdminPage = () => {
    const authCtx = useContext(AuthContext);
    return ( 
      <div>
      Admin Page!
      </div>
      );
  };
  
  export default AdminPage;
  