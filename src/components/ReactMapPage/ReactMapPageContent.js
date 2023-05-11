import { React, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import storesData from "./groceries-stores.json";
import "./ReactMapPageContent.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import NewMapCard from "../UI/NewMapCard";
import LocationMarker from "./LocationMarker";
import PopupButton from "./PopupButton";
import { useHistory, useLocation } from "react-router-dom";
import "./../UI/NewMapCard.css";
import "./PopUp.css";
import L from "leaflet";

function LocationButton() {
  const location = useLocation();
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      // console.log(e.latlng);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return (
    <button className="location-button" onClick={() => map.locate()}>
      Find my location
    </button>
  );
}

export default function ReactMapPageContent() {
  const [storesJSON, setStoresJSON] = useState([]);
  const [offersJSON, setOffersJSON] = useState([]);
  const [storesWithin, setStoresWithin] = useState([]);
  const history = useHistory();
  const hardcodedStores = Object.values(storesData.elements);
  // console.log("hardcodedStores" + hardcodedStores);
  const handleAddButtonClick = () => {
    history.push("/newoffer");
  };

  const handleStoresWithinUpdate = (storesWithin) => {
    // update the state with the new value of storesWithin
    // console.log("storesWithin");
    // console.log(storesWithin.data.data[0]._id);
    setStoresWithin(storesWithin.data.data[0]._id);
    // console.log("storesWithin in Map: " + JSON.stringify(storesWithin));
    // console.log(JSON.stringify(storesWithin.data.data));
  };

  const isStoreWithin = (storesWithin, store) => {
    const storesWithinId = [];
    console.log("storesWithin");
    console.log(storesWithin);

    storesWithin.map((store) => {
      storesWithinId.push(store._id);
    });
    console.log(storesWithinId);
    // const isContained = storesWithinId.includes(store._id);
    // console.log(isContained);
    // return isContained;
  };

  const handleReviewButtonClick = () => {
    history.push({
      pathname: "/reviewStore",
      state: { offers: offersJSON },
    });
  };

  // Define a custom red icon
  const redIcon = new L.Icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  });

  const blueIcon = new L.Icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/stores/getAllStores")
      .then((response) => response.json())
      .then((data) => {
        setStoresJSON(Object.values(data.data.stores));
        // const stores = Object.values(storesJSON.data.stores);
        // console.log(JSON.stringify(data.data.stores));
        // console.log("storesWithin in Map: " + JSON.stringify(storesWithin));
        // console.log("storedJSON in Map: " + storesJSON);
      });
  }, []);

  return (
    <div>
      <MapContainer
        center={[38.07123, 23.813574]}
        zoom={16}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <L.Control.Geocoder
        position="topleft" // move the control to the top-left corner
        placeholder="Search..." // customize the placeholder text
        defaultMarkGeocode={false} // prevent the map from zooming to the search result
      /> */}
        <LocationButton />
        <LocationMarker onUpdate={handleStoresWithinUpdate} />

        {storesJSON.map((store) => (
          <Marker
            key={store._id}
            position={[
              store.location.coordinates[0],
              store.location.coordinates[1],
            ]}
            eventHandlers={{
              click: (e) => {
                fetch(
                  `http://localhost:3000/api/v1/offers/getStoreOffers/${store._id}`
                )
                  .then((response) => response.json())
                  .then((data) => {
                    setOffersJSON(data.data.offers);
                    // console.log(data.data.offers);
                  })
                  // .then(() => {
                  //   isStoreWithin(storesJSON, store);
                  // })
                  .catch((error) => console.error(error));
              },
            }}
            icon={isStoreWithin(storesWithin, store) ? redIcon : blueIcon}
            // icon={redIcon}
          >
            <Popup className="pop-up">
              <div className="container-pop-up">
                <div className="container-title">
                  <h2 className="store">{store.name}</h2>
                  {/* <p className="description">{store.address}</p> */}
                </div>
                <ul className="container-offers">
                  {/* <section>
                <ul></ul>
               </section> */}
                  {offersJSON.map((offer) => (
                    <NewMapCard
                      key={offer._id}
                      price={offer.price}
                      likes={offer.likes}
                      dislikes={offer.dislikes}
                      name={offer.product.name}
                      // inStock={inStock}
                    />
                  ))}
                </ul>
                <div className="container-buttons">
                  {offersJSON.length !== 0 && (
                    <button
                      className="button"
                      onClick={handleReviewButtonClick}
                    >
                      Αξιολόγηση
                    </button>
                  )}
                  <button className="button" onClick={handleAddButtonClick}>
                    Προσθήκη
                    {/* props to pass store.id */}
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
