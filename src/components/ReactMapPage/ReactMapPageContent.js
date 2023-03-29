import { React, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'
import storesData from './groceries-stores.json'
import './ReactMapPageContent.css'
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import L from 'leaflet';
import "leaflet-control-geocoder";
import { Button } from '@mui/material'
import HorizontalCard from '../UI/HorizontalCard'
import LocationMarker from './LocationMarker'

function LocationButton() {
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

export default function ReactMapPageContent() {
  const stores = Object.values(storesData.elements);

  return (
    <div>
    <MapContainer center={[38.071230, 23.813574]} zoom={16} scrollWheelZoom={false}>
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
    <LocationMarker/>
  
  {stores.map(store => (
    <Marker key={store.id} position={[store.lat, store.lon]}>
      <Popup className="pop-up"> 
        <div className='container-pop-up'>
          <div className='container-title'>
            <h2 className="store">{store.tags.brand}</h2>
            <p className="description">{store.tags.addr_street}</p>
          </div>
          <div className='container-offers'>
            {store.products.map(product => (
            <HorizontalCard key={product.id} product={product.name} />
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
</div>
  )
}
