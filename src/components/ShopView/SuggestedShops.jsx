import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FS } from "../../firebase";
import { useAuth } from "../../Context/AuthContext";
import ShopViewCard from "./ShopViewCard";

function SuggestedShpos() {
	const [nearby, setNearby] = useState([]);
	const auth = useAuth();

	useEffect(() => {
		let found = 0;
		const c = collection(FS, "shops");
		const q = query(c, where("city", "==", auth.data.city), limit(10));
		getDocs(q).then((snap) => {
			setNearby(snap.docs.map((i) => ({ ...i.data(), id: i.id })));
			found += snap.docs.length;

			const q2 = query(c, where("district", "==", auth.data.district), limit(10 - found));
			getDocs(q2).then((snap) => {
				found += snap.docs.length;
				setNearby((d) =>
					d.concat(snap.docs.filter((i) => !d.find((p) => p.id == i.id)).map((i) => ({ ...i.data(), id: i.id })))
				);
				const q3 = query(c, where("district", "!=", auth.data.district), limit(10 - found));
				getDocs(q3).then((snap) => {
					setNearby((d) => d.concat(snap.docs.map((i) => ({ ...i.data(), id: i.id }))));
				});
			});
		});
	}, []);

	return (
		<div>
			<div className="p-1"></div>
			<h2>Suggested shops</h2>
			<div className="shop-holder pt-2">
				{nearby.map((i) => (
					<ShopViewCard key={i.id} data={i} />
				))}
			</div>
		</div>
	);
}

export default SuggestedShpos;
