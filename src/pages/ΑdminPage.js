import { useContext } from 'react';
import StartingPageContent from '../components/StartingPage/StartingPageContent';
import MapPageContent from '../components/MapPage/MapPageContent';
import AuthContext from '../store/auth-context';

const AdminPage = () => {
    const authCtx = useContext(AuthContext);
    return ( 
      <div>
      Admin Page!
      </div>
      );
  };
  
  export default AdminPage;
  