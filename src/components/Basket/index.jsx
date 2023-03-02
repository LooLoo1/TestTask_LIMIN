import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { setAction } from "../../store/basketReducer";

import "./basket.scss";

export const Basket = () => {
  const { list } = useSelector((state) => state.basketReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem(`basket`))) {
      dispatch(setAction(JSON.parse(localStorage.getItem(`basket`))));
    }
  }, []);
  return (
    <div className="backet">
      <FontAwesomeIcon icon={faCartShopping} />
      <span>{list.length}</span>
    </div>
  );
};
export default Basket;
