import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FS, Storage } from "../../../firebase";
import AboutTab from "./AboutTab";
import "./shop.scss";
import Reviews from "./Reviews";

function Shop() {
	const { shopID } = useParams();
	const [data, setData] = useState({});
	const [selected, setSelected] = useState(0);
	const [foodList, setFoodList] = useState([]);

	useEffect(() => {
		const d = doc(FS, "shops", shopID);
		getDoc(d)
			.then((snap) => {
				setData(snap.data());

				const r = ref(Storage, "shop/" + shopID);
				getDownloadURL(r).then((url) => setData((d) => ({ ...d, url })));
			})
			.catch(() => setData(null));

		const c = collection(FS, "shops", shopID, "foods");
		getDocs(c).then((snap) => {
			setFoodList(
				snap.docs.map((i) => ({
					...i.data(),
					id: i.id,
				}))
			);
		});
	}, []);

	if (data == null) return "Not found";

	return (
		<div className="container shop-container">
			<div className="shop-header" style={{ backgroundImage: `url("${data.url}")` }}>
				<div className="grad">
					<h1 align="center">{data.shopName}</h1>
				</div>
			</div>
			<div className="tab-holder">
				<div onClick={() => setSelected(0)} className={selected == 0 ? "tab-selected" : ""}>
					Foods
				</div>
				<div onClick={() => setSelected(1)} className={selected == 1 ? "tab-selected" : ""}>
					Reviews
				</div>
				<div onClick={() => setSelected(2)} className={selected == 2 ? "tab-selected" : ""}>
					About
				</div>
			</div>
			{selected == 0 && <FoodView shopID={shopID} foodList={foodList} />}
			{selected == 1 && <Reviews shopID={shopID} />}
			{selected == 2 && <AboutTab data={data} />}
		</div>
	);
}

function FoodView({ foodList, shopID }) {
	return (
		<div className="food-items">
			{foodList.map((i) => (
				<FoodItemView key={i.id} data={i} shopID={shopID} />
			))}
		</div>
	);
}

function FoodItemView({ data, shopID }) {
	const [url, setURL] = useState(null);
	useEffect(() => {
		const r = ref(Storage, "foods/" + shopID + "/" + data.id);
		getDownloadURL(r).then(setURL);
	}, []);
	return (
		<div className="food-item-view">
			<div className="food-image" style={{ backgroundImage: `url("${url}")` }}>
				<div className="grad">
					<h3 align="center">{data.name}</h3>
               <p>{data.description}</p>
				</div>
			</div>
			<div className="food-details">
				<p>Rs. {data.price} /=</p>
			</div>
		</div>
	);
}

export default Shop;
