import React from "react";

const NewMapCard = (props) => {
  return (
    <li className="mapCard">
      <h3 className="mapUpperLine">
        <div>{props.name}</div>
        <div>{props.price}€ /συσκ.</div>
      </h3>
      <h3 className="mapLowerLine">
        <div className="mapIcons">
          <div className="icon">
            {props.likes + " "}
            <i className="fa-solid fa-thumbs-up"></i>
          </div>
          <div className="icon">
            {props.dislikes + " "}
            <i className="fa-solid fa-thumbs-down"></i>
          </div>
          <div className="icon">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <div className="icon">
            <i className="fa-sharp fa-solid fa-circle-check"></i>
          </div>
        </div>
        <div>24/1/22</div>
      </h3>
    </li>
  );
};

export default NewMapCard;
