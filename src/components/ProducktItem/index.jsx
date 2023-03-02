import React from "react";
import "./produckt.scss";
import { imgs } from "../../img/imgs";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeItemAction } from "../../store/basketReducer";
import { useNavigate } from "react-router-dom";

const ProducktItem = ({ data, index }) => {
  const { img, name, price, rating, id } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="produckt">
      <img
        src={imgs[img]}
        alt={name}
        onClick={() => {
          navigate(`/${id}`);
        }}
      />
      <h3>{name}</h3>
      <div className="conteiner-data">
        <p className="price">${price}</p>
        <span className="rating">
          {rating}
          <FontAwesomeIcon icon={faStar} />
        </span>
      </div>
      <Button
        onClick={() => {
          dispatch(removeItemAction(index));
        }}
      >
        Remove from Cart
      </Button>
    </div>
  );
};

export default ProducktItem;

// {
// 	"id": 1,
// 	"img": 0,
// 	"name": "Radiant Skin Cream",
// 	"description": "Get glowing, radiant skin with this luxurious cream. Infused with natural ingredients and antioxidants, it helps to reduce the appearance of fine lines and wrinkles, while providing intense hydration for a plumper, more youthful-looking complexion. With its lightweight, non-greasy formula, it's perfect for all skin types.",
// 	"rating": 4.1,
// 	"price": 79.99,
// 	"firm": "Glow Cosmetics"
//  },
