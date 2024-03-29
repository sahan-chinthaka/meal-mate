import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAuth } from "../../Context/AuthContext";
import { FS, Storage } from "../../firebase";
import "./FoodItemView.scss";
import { useNavigate } from "react-router-dom";

function FoodItemView({ data, shopID }) {
	const [url, setURL] = useState(null);
	const [fav, setFav] = useState(null);
	const navigate = useNavigate();
	const auth = useAuth();

	useEffect(() => {
		const r = ref(Storage, "foods/" + shopID + "/" + data.id);
		getDownloadURL(r).then(setURL);

		const d = doc(FS, "users", auth.user.uid, "favourites", data.id);
		getDoc(d).then((snap) => {
			const f = snap.data();
			setFav(f !== undefined);
		});
	}, []);

	function buyClick() {
		navigate("/orders/new-order", {
			state: {
				...data,
				shopID,
			},
		});
	}

	function favClick() {
		const d = doc(FS, "users", auth.user.uid, "favourites", data.id);
		if (fav === false)
			setDoc(d, {
				date: serverTimestamp(),
				shopID: shopID,
			});
		else deleteDoc(d);
		setFav((a) => !a);
	}
	return (
		<div className="food-item-view">
			<div className="food-image" style={{ backgroundImage: `url("${url}")` }}>
				<div className="grad">
					<h3 align="center">
						{data.name} {fav !== null && <span onClick={favClick}>{fav ? <AiFillHeart /> : <AiOutlineHeart />}</span>}
					</h3>
					<p>{data.description}</p>
				</div>
			</div>
			<div className="food-details">
				<p>Rs. {data.price} /=</p>
				{data.available ? (
					<button onClick={buyClick} className="button-28">
						Buy
					</button>
				) : (
					<span className="ms-auto">Not available</span>
				)}
			</div>
		</div>
	);
}

export default FoodItemView;
