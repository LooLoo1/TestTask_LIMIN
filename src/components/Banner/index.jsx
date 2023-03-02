import React from "react";
import Button from "../Button";
import "./banner.scss";
import { imgs, data } from "../../img/imgs";
import { useDispatch } from "react-redux";
import { addItemAction } from "../../store/basketReducer";

const Banner = () => {
	const dispatch = useDispatch()
  return (
    <div className="banner">
      <div className="dark">
        <div className="text">
          <p>Complete Skincare Set $350 20% Off</p>
          <span>
            Because you bougth Fundamental Duo For Optimal Skin care, Upgrade
          </span>
        </div>
      </div>
      <div className="light">
        <img src={imgs[6]} alt="" />
        <Button onClick={()=>{dispatch(addItemAction(data[5]))}}>Add to Card</Button>
      </div>
    </div>
  );
};

export default Banner;
