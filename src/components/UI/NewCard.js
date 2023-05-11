import React from "react";

const NewCard = (props) => {
  return (
    <li className="card">
      <h3 className="upperLine">
        <div>{props.name}</div>
        <div>{props.price}€ /συσκ.</div>
      </h3>
      <h3 className="lowerLine">
        <div className="icons">
          <button className="icon">
            {props.likes + " "}
            <i className="fa-solid fa-thumbs-up"></i>
          </button>
          <button className="icon">
            {props.dislikes + " "}
            <i className="fa-solid fa-thumbs-down"></i>
          </button>
          <div className="icon">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <button className="icon">
            <i className="fa-sharp fa-solid fa-circle-check"></i>
          </button>
        </div>
        <div>24/1/22</div>
      </h3>
    </li>
  );
};

export default NewCard;
