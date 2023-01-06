import { useContext } from 'react';
import StartingPageContent from '../components/StartingPage/StartingPageContent';
import MapPageContent from '../components/MapPage/MapPageContent';
import AuthContext from '../store/auth-context';



const HomePage = () => {
  const authCtx = useContext(AuthContext);
  return ( 
    <div>
    {!authCtx.isLoggedIn && <StartingPageContent />}
    {authCtx.isLoggedIn && <MapPageContent />}
    </div>
    );
};

export default HomePage;
