import React from 'react'

const HorizontalCard = (props) => {
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
  )
}

export default HorizontalCard