import { React, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "./ReactMapPageContent.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import NewMapCard from "../UI/NewMapCard";
import LocationMarker from "./LocationMarker";
import { useHistory, useLocation, Link } from "react-router-dom";
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

function isDistanceLessThan500m(location1, location2) {
  const lat1 = location1[0];
  const lon1 = location1[1];
  const lat2 = location2[0];
  const lon2 = location2[1];
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km

  return d < 0.5;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default function ReactMapPageContent() {
  const [storesJSON, setStoresJSON] = useState([]);
  const [offersJSON, setOffersJSON] = useState([]);
  const history = useHistory();

  const position = [38.04826112872981, 23.818216389001485];

  const handleAddButtonClick = () => {
    history.push("/newoffer");
  };

  const getStoreOffers = (id) => {
    fetch(`http://localhost:3000/api/v1/offers/getStoreOffers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setOffersJSON(data.data.offers);
        // console.log(data.data.offers);
      })
      // .then(() => {
      //   isStoreWithin(storesJSON, store);
      // })
      .catch((error) => console.error(error));
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
        console.log(data.data.stores);
        setStoresJSON(Object.values(data.data.stores));
      });
  }, []);

  if (!offersJSON) {
    return <div>Loading...</div>;
  }

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
        <LocationButton />
        <LocationMarker />
        {storesJSON.map((store) => (
          <Marker
            key={store._id}
            position={[
              store.location.coordinates[0],
              store.location.coordinates[1],
            ]}
            eventHandlers={{
              click: () => {
                getStoreOffers(store._id);
              },
            }}
            // icon={offersJSON.length == 0 ? redIcon : blueIcon}
            icon={blueIcon}
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
                  {isDistanceLessThan500m(
                    position,
                    store.location.coordinates
                  ) && (
                    <Link
                      className="container-buttons"
                      to={`/reviewstore/${store._id}`}
                    >
                      <button>Aξιολόγηση</button>
                    </Link>
                  )}
                  {offersJSON.length !== 0 && (
                    <Link
                      className="container-buttons"
                      to={`/newoffer/${store._id}`}
                    >
                      <button>Προσθήκη</button>
                    </Link>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
