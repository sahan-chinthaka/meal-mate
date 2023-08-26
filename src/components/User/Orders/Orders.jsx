import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { FS, Storage } from "../../../firebase";
import "./Orders.scss";
import { useNavigate } from "react-router-dom";

function Orders() {
	const auth = useAuth();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const c = collection(FS, "orders");

		getDocs(query(c, where("userID", "==", auth.user.uid), orderBy("created"))).then((snap) => {
			setOrders(snap.docs.map((i) => ({ ...i.data(), id: i.id })));
		});
	}, []);

	return (
		<div className="orders">
			{orders.map((i) => (
				<ItemView key={i.id} data={i} />
			))}
		</div>
	);
}

function ItemView({ data }) {
	const [food, setFood] = useState({});
	const [img, setImg] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const d = doc(FS, "shops", data.shopID, "foods", data.foodID);
		getDoc(d).then((snap) => setFood(snap.data()));

		const r = ref(Storage, "foods/" + data.shopID + "/" + data.foodID);
		getDownloadURL(r).then(setImg);
	}, []);

	return (
		<div onClick={() => navigate("/orders/" + data.id)} className="order">
			<img src={img} alt="" width={100} />
			<div>
				<h2>{food.name}</h2>
				<p>Order Date: {new Date(data.created.seconds * 1000).toLocaleDateString()}</p>
				<p>Status: {data.state}</p>
			</div>
		</div>
	);
}

export default Orders;
