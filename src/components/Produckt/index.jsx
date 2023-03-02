import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { imgs } from "../../img/imgs";
import Button from "../Button";
import { addItemAction } from "../../store/basketReducer";

import "./produckt.scss";

const Produck = ({ data }) => {
  const { img, name, price, rating, id } = data;
  const { user } = useSelector((state) => state.authReducer);

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
          user ? dispatch(addItemAction(data)) : navigate("/login");
        }}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default Produck;
