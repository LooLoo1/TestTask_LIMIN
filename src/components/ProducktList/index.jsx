import React, { useState } from "react";

import Produckt from "../Produckt";
import { data } from "../../img/imgs";

import "./producktList.scss";

const ProducktList = () => {
  const [open, setOpen] = useState(false);
  const [produckts, setProduckts] = useState(data.slice(0, 4));

  return (
    <div className="produckt-conteiner">
      <h3>Other Recommended Products</h3>
      <div className="produckt-list">
        {produckts.map((e) => (
          <Produckt key={e.id} data={e} />
        ))}
      </div>
      {!open && (
        <p
          onClick={() => {
            setOpen(true);
            setProduckts(data);
          }}
        >
          View All Products
        </p>
      )}
    </div>
  );
};

export default ProducktList;
