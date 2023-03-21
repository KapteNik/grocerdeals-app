import { Button } from '@mui/material'
import { useState, React, useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import storesData from './food-stores.json'
import './ReactMapPageContent.css'
import L from "leaflet"
import icon from "./constants";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);
  

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius/10);
      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  },[map]);

  return position === null ? null : (
    <Marker position={position} icon={icon}>
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
}

function HorizontalCard(props) {
  return (
      <div className="horizontalCard">
        <h3 className="horizontalCard__content1">{props.product} </h3>
        <h3 className="horizontalCard__content2">{props.price}/συσκ.</h3>
        <h3 className="horizontalCard__content3">
         <div>
          {props.likes + " "}    
          <i class="fa-solid fa-thumbs-up"></i> 
          </div>
          <div>
          {props.dislikes + " "} 
          <i class="fa-solid fa-thumbs-down"></i> 
          </div>
          <i class="fa-solid fa-cart-shopping"></i> 
          <i class="fa-sharp fa-solid fa-circle-check"></i>
        </h3>
        <h4 className="horizontalCard__content4">{props.date}</h4>
      </div>
  );
}

export default function ReactMapPageContent() {
  const [supermarkets, setSupermarkets] = useState([]);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);

        // Fetch the local supermarkets based on the user's current location
        fetch(`https://api.openstreetmap.org/api/0.6/map?bbox=${position.coords.longitude-2},${position.coords.latitude-0.1},${position.coords.longitude+0.1},${position.coords.latitude+0.1}`)
          .then(response => response.text())
          .then(data => {
            // Parse the OSM XML response
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'application/xml');

            // Extract the nodes representing supermarkets
            const nodes = xml.querySelectorAll('node[shop=supermarket]');
            const supermarkets = Array.from(nodes).map(node => ({
              lat: node.getAttribute('lat'),
              lng: node.getAttribute('lon'),
              name: node.querySelector('tag[k=v]').getAttribute('v')
            }));

            setSupermarkets(supermarkets);
          })
          .catch(error => console.log(error));
      },
      (error) => console.log(error),
      { enableHighAccuracy: true }
    );
  }, []);
  
  return (
    <MapContainer center={[38.24854724404937, 21.739317840108985]} zoom={16} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <LocationMarker/>

  console.log(supermarkets);

  {supermarkets.map((supermarket, index) => (
        <Marker key={index} position={[supermarket.lat, supermarket.lng]}>
          <Popup>{supermarket.name}</Popup>
        </Marker>
      ))}

  {storesData.stores.map(store => (
    <Marker key={store.NAME} position={store.COORDINATES}>
      <Popup> 
        <div className='container-pop-up'>
          <div className='container-title'>
            <h2 className="store">{store.NAME}</h2>
            <p className="description">{store.DESCRIPTION}</p>
          </div>
          <div className='container-offers'>
            {store.OFFERS.map(offer => (
            <HorizontalCard product={offer.PRODUCT} price={offer.PRICE} date={offer.DATE} likes={offer.LIKES} dislikes={offer.DISLIKES} valid={offer.VALID} instock={offer.INSTOCK}/>
               )
              )
            }
          </div>
        <div className="container-buttons"> 
        <button className='button'>Αξιολόγηση</button>    
        <button className='button'>Προσθήκη</button>
        </div>
        </div>
      </Popup>
    </Marker>
  ))}
</MapContainer>
  )
}
