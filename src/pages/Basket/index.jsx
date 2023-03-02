import { useEffect, useState } from "react";
import "./basket.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import ProducktItem from "../../components/ProducktItem";
import { cleanAction } from "../../store/basketReducer";
// import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

function Basket({ type }) {
  const { user } = useSelector((state) => state.authReducer);
  const { list } = useSelector((state) => state.basketReducer);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState(list);
  const [sum, setSum] = useState(
    list.reduce((acc, { price }) => acc + price, 0).toFixed(2)
  );

  //   setSum(list.reduce((acc, { price }) => acc + price, 0).toFixed(2));
  const [title, setTitle] = useState(`Buy ${sum}`);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterType = (e) => {
    setFilter(e.target.innerText);
  };

  const addToFireBase = async (data) => {
    //  const name = `${Date.now()}`;
    await setDoc(doc(db, "Buy", `${user.email}`), {
      time: data,
    });
  };

  useEffect(() => {
    const result =
      filter === "Expensive"
        ? [...list].sort((a, b) => b.price - a.price)
        : filter === "Cheap"
        ? [...list].sort((a, b) => a.price - b.price)
        : filter === "Rating"
        ? [...list].sort((a, b) => b.rating - a.rating)
        : list;
    setData(result);
    setSum(result.reduce((acc, { price }) => acc + price, 0).toFixed(2));
    setTitle(`Buy ${sum}`);
  }, [filter, list]);

  return (
    <div className="filter-conteiner">
      {data.length === 0 && (
        <p className="center">Your shopping cart is empty :)</p>
      )}
      {data.length > 0 && (
        <div className="filters">
          <input id="Expensive" type="radio" name="filter" />
          <label htmlFor="Expensive" onClick={filterType}>
            Expensive
          </label>
          <input id="Cheap" type="radio" name="filter" />
          <label htmlFor="Cheap" onClick={filterType}>
            Cheap
          </label>
          <input id="Rating" type="radio" name="filter" />
          <label htmlFor="Rating" onClick={filterType}>
            Rating
          </label>
        </div>
      )}
      <div className="filter-list">
        {data.map((e, i) => (
          <ProducktItem key={`${e.i} ${i}`} data={e} index={e.time} />
        ))}
      </div>
      {data.length > 0 && (
        <div className="buttons">
          <Button
            onClick={() => {
              dispatch(cleanAction());
            }}
          >
            Clean all
          </Button>
          <Button
            onClick={() => {
              addToFireBase([...list]);
              setTitle("Order successful");
              setTimeout(() => {
                dispatch(cleanAction());
                navigate("/");
              }, 2000);
            }}
          >
            {title}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Basket;
