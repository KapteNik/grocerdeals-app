import { useState, React, useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import storesData from './groceries-stores.json'
import groceriesData from './groceries-categories.json'
import './ReactMapPageContent.css'
import L from "leaflet"
import icon from "./constants";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      e.latlng=[38.04826112872981, 23.818216389001485];
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      // const radius = e.accuracy;
      // const circle = L.circle(e.latlng, radius);
      // circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });

  },[map]);

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
}

//Horizontal Card Component
function HorizontalCard(props) {
  return (
      <div className="horizontalCard">
        <h3 className="horizontalCard__content1">{props.product} </h3>
        <h3 className="horizontalCard__content2">{props.price}/συσκ.</h3>
        <h3 className="horizontalCard__content3">
         <div>
          {props.likes + " "}    
          <i className="fa-solid fa-thumbs-up"></i> 
          </div>
          <div>
          {props.dislikes + " "} 
          <i className="fa-solid fa-thumbs-down"></i> 
          </div>
          <i className="fa-solid fa-cart-shopping"></i> 
          <i className="fa-sharp fa-solid fa-circle-check"></i>
        </h3>
        <h4 className="horizontalCard__content4">{props.date}</h4>
      </div>
  );
}

export default function ReactMapPageContent() {
  const stores = Object.values(storesData.elements);

  return (
    <MapContainer center={[38.071230, 23.813574]} zoom={16} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <LocationMarker/>
  

  {/* Mapping of Hardcoded POIs */}
  {stores.map(store => (

    <Marker key={store.id} position={[store.lat, store.lon]}>
      <Popup className="pop-up"> 
        <div className='container-pop-up'>
          <div className='container-title'>
            <h2 className="store">{store.tags.brand}</h2>
            <p className="description">{store.tags.addr_street}</p>
          </div>
          <div className='container-offers'>

          {/* {for (let step = 0; step < stores.tags.products.length; step++) {
              id = stores.tags.products[i];
              current_product = products.id = id;
              <HorizontalCard product={current_product.name}/>
              }} */}
            {store.products.map(product => (
            <HorizontalCard key={product.id} product={product.name} 
            // price={product.PRICE} date={product.DATE} likes={product.LIKES} dislikes={product.DISLIKES} valid={product.VALID} instock={product.INSTOCK}
            />
              ))}
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
