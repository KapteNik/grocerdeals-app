import React from "react";
import { useEffect, useState } from "react";

const manipulateLikes = (id, typeOfLike, setLoaded) => {
  fetch(`http://localhost:3000/api/v1/offers/add${typeOfLike}`, {
    method: "PATCH",
    body: JSON.stringify({
      id: id,
      user: "642da89e984cea1f14a03a5a",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    setLoaded((prevLoaded) => !prevLoaded);
  });
};

// const manipulateStock = (id) => {
//   fetch(`http://localhost:3000/api/v1/offers/increment${typeOfLike}`, {
//     method: "PATCH",
//     body: JSON.stringify({
//       id: id,
//       user: "642da89e984cea1f14a03a5a",
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((res) => {
//     setLoaded((prevLoaded) => !prevLoaded);
//   });
// };

function NewCard(props) {
  const [inStock, setInStock] = useState(null);

  return (
    <li className="card">
      <h3 className="upperLine">
        <div>{props.name}</div>
        <div>{props.price}€ /συσκ.</div>
      </h3>
      <h3 className="lowerLine">
        <div className="icons">
          <button
            className="icon"
            onClick={() =>
              manipulateLikes(props.id, "Dislike", props.setLoaded)
            }
          >
            {props.likes + " "}
            <i className="fa-solid fa-thumbs-up"></i>
          </button>
          <button
            className="icon"
            onClick={() => manipulateLikes(props.id, "Like", props.setLoaded)}
          >
            {props.dislikes + " "}
            <i className="fa-solid fa-thumbs-down"></i>
          </button>
          <button
            className="icon"
            //  onClick={() => manipulateStock(props.id)}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
          <div className="icon">
            <i className="fa-sharp fa-solid fa-circle-check"></i>
          </div>
        </div>
        <div>24/1/22</div>
      </h3>
    </li>
  );
}

export default NewCard;
