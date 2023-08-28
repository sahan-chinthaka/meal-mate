import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { FS } from "../../firebase";
import FoodItemView from "../FoodItemView/FoodItemView";
import "./FavFoods.scss";

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
		<div className="FavFoods">
			<h1 className="title">Meal Mate</h1>

			{foodList.map((i) => (
				<FoodItemView key={i.id} data={i} shopID={i.shopID} />
			))}

			<div>
				<h3 className="body">
					Discover a world of local flavors at Meal Mate
					Connect with nearby restaurants, explore their menus
					and order your favorite meals online.
				</h3>
			</div>
		</div>


	);
}

export default FavFoods;
