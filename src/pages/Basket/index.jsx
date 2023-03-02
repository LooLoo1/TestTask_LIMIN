import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/Button";
import ProducktItem from "../../components/ProducktItem";
import { cleanAction } from "../../store/basketReducer";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

import "./basket.scss";

function Basket({ type }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
 
	const { user } = useSelector((state) => state.authReducer);
	const { list } = useSelector((state) => state.basketReducer);
	const [filter, setFilter] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);
 
	const data = useMemo(() => {
	  if (filter === "Expensive") return [...list].sort((a, b) => b.price - a.price);
	  if (filter === "Cheap") return [...list].sort((a, b) => a.price - b.price);
	  if (filter === "Rating") return [...list].sort((a, b) => b.rating - a.rating);
 
	  return list;
	}, [filter, list]);
 
	const totalSum = useMemo(() => data.reduce((acc, { price }) => acc + price, 0).toFixed(2), [data]);
 
	const filterType = (e) => setFilter(e.target.innerText);
 
	const onBuyClick = async () => {
	  await setDoc(doc(db, "Buy", `${user.email}`), {
		 time: [...list],
	  });
	  setIsSuccess(true);
 
	  setTimeout(() => {
		 dispatch(cleanAction());
		 navigate("/");
	  }, 2000);
	};
 
	if (data.length === 0)
	  return (
		 <div className="filter-conteiner">
			<p className="center">Your shopping cart is empty :)</p>
		 </div>
	  );
 
	return (
	  <div className="filter-conteiner">
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
 
		 <div className="filter-list">
			{data.map((e, i) => (
			  <ProducktItem key={`${e.i} ${i}`} data={e} index={e.time} />
			))}
		 </div>
 
		 <div className="buttons">
			<Button
			  onClick={() => {
				 dispatch(cleanAction());
			  }}
			>
			  Clean all
			</Button>
			<Button onClick={onBuyClick}>{isSuccess ? "Order successful" : `Buy ${totalSum}`}</Button>
		 </div>
	  </div>
	);
 }
export default Basket;
