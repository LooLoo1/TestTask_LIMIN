import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";
import { addItemAction } from "../../store/basketReducer";
import { data, imgs } from "../../img/imgs";

import './produckt.scss'

const Produckt = () => {
  const { user } = useSelector((state) => state.authReducer);

  const { product } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const info = data.find((el) => el.id === Number(product));
  const { img, name, description, rating } = info;
  return (
    <div className="card">
      <img src={imgs[img]} />
      <div className="card-info">
        <div className="card-title">
          <h2>{name}</h2>
          <span>
            {rating}
            <FontAwesomeIcon icon={faStar} />
          </span>
        </div>
        <p className="card-description">{description}</p>
        <Button
          onClick={() => {
            user ? dispatch(addItemAction(info)) : navigate("/login");
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Produckt;
