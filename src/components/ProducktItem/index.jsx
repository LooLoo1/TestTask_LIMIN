import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { imgs } from "../../img/imgs";
import Button from "../Button";
import { removeItemAction } from "../../store/basketReducer";

import "./produckt.scss";

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