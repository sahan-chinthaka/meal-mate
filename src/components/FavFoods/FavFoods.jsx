import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { FS } from "../../firebase";
import FoodItemView from "../FoodItemView/FoodItemView";

function FavFoods() {
	const auth = useAuth();
	const [foodList, setFoodList] = useState([]);

	useEffect(() => {
		const c = collection(FS, "users", auth.user.uid, "favourites");
		getDocs(c).then((snap) => {
			snap.forEach((i) => {
				const d = doc(FS, "shops", i.data().shopID, "foods", i.id);
				getDoc(d).then((a) => {
					setFoodList((list) => [...list, { ...i.data(), ...a.data(), id: a.id }]);
				});
			});
		});
	}, []);

	return (
		<div>
			<h1 className="title">Favourite Foods</h1>

			{foodList.map((i) => (
				<FoodItemView key={i.id} data={i} shopID={i.shopID} />
			))}
		</div>
	);
}

export default FavFoods;
