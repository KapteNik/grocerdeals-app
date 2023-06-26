import { useLocation } from "react-router-dom";
import NewCard from "./../components/UI/NewCard";
import { useParams } from "react-router-dom";
import "./../components/UI/NewCard.css";
import { useEffect, useState } from "react";

function ProfilePage() {
  // const location = useLocation();
  // const offersArray = Object.values(location.state.offers);
  const storeId = Object.values(useParams());
  const [offers, setOffers] = useState(null);
  const [loaded, setLoaded] = useState(true);

  // const toggleLoaded = () => {
  //   setLoaded((prevLoaded) => !prevLoaded);
  // };

  useEffect(() => {
    console.log(storeId);
    fetch(`http://localhost:3000/api/v1/offers/getStoreOffers/${storeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOffers(data.data.offers);
        // console.log(data.data.offers);
      });
  }, [loaded]);

  if (!offers) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {offers.map((offer) => (
        <NewCard
          key={offer._id}
          id={offer._id}
          price={offer.price}
          likes={offer.likes}
          dislikes={offer.dislikes}
          name={offer.product.name}
          setLoaded={setLoaded}
        />
      ))}
    </ul>
  );
}
export default ProfilePage;
