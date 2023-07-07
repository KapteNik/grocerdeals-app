import { useState, React, useEffect } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "./constants";

const LocationMarker = ({ onUpdate }) => {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);

  let map = useMap();
  // let location = [];

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      e.latlng = [38.04826112872981, 23.818216389001485];  //uncommment for real location
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      // const radius = e.accuracy;
      // const circle = L.circle(e.latlng, radius);
      // circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));

      fetch(
        // `http://localhost:3000/api/v1/stores/stores-within/0.5/center/${e.latlng.lat},${e.latlng.lng}/unit/km`
        `http://localhost:3000/api/v1/stores/stores-within/0.5/center/38.04826112872981,23.818216389001485/unit/km`
      )
        .then((response) => response.json())
        .then((data) => {
          // setStoresJSON(Object.values(data.data.stores));
          // const stores = Object.values(storesJSON.data.stores);
          console.log(data);
        })
        .catch((error) => console.error(error));
    });
    L.Control.geocoder().addTo(map);

    // console.log("useEffect: " + location);
  }, [map]);

  return position === null ? null : (
    <Marker key={position[0]} position={position} icon={icon}>
      <Popup>
        You are here. <br />
        Map bbox: <br />
        <b>Southwest lng</b>: {bbox[0]} <br />
        <b>Southwest lat</b>: {bbox[1]} <br />
        <b>Northeast lng</b>: {bbox[2]} <br />
        <b>Northeast lat</b>: {bbox[3]}
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
