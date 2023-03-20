import { Button } from '@mui/material'
import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import storesData from './food-stores.json'
import './ReactMapPageContent.css'

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
  return (
    <MapContainer center={[38.24854724404937, 21.739317840108985]} zoom={16} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
 

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
