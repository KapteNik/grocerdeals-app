import { useLocation } from "react-router-dom";
import NewCard from "./../components/UI/NewCard";
import "./../components/UI/NewCard.css";

const ProfilePage = () => {
  const location = useLocation();
  const offersArray = Object.values(location.state.offers);
  console.log(location.state.offers);
  console.log(location.state.offers[0]._id);

  return (
    <ul>
      {offersArray.map((offer) => (
        <NewCard
          key={offer._id}
          price={offer.price}
          likes={offer.likes}
          dislikes={offer.dislikes}
          name={offer.product.name}
        />
      ))}
    </ul>
  );
};
export default ProfilePage;
