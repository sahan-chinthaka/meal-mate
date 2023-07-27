import { useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { and, collection, getDocs, limit, or, orderBy, query, where } from "firebase/firestore";
import { FS, Storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

function UserHome() {
	const auth = useAuth();
	const [nearby, setNearby] = useState([]);
	const [search, setSearch] = useState(null);

	useEffect(() => {
		const c = collection(FS, "shops");
		const q = query(c, where("district", "==", auth.data.district));
		getDocs(q).then((snap) => {
			setNearby(snap.docs.map((i) => ({ ...i.data(), id: i.id })));
		});
	}, []);

	function keyUp(e) {
		if (e.keyCode == 27) {
			e.target.value = "";
			setSearch(null);
		} else if (e.keyCode == 13) {
			const text = e.target.value.trim();
			if (text.length < 2) return;

			const c = collection(FS, "shops");
			const q = query(
				c,
				or(
					and(where("shopName", ">=", text), where("shopName", "<=", text + "\uf8ff")),
					and(
						where("shopName", ">=", text.charAt(0).toUpperCase() + text.slice(1)),
						where("shopName", "<=", text.charAt(0).toUpperCase() + text.slice(1) + "\uf8ff")
					),
					and(where("shopName", ">=", text.toLowerCase()), where("shopName", "<=", text.toLowerCase() + "\uf8ff"))
				),
				orderBy("shopName"),
				limit(10)
			);

			getDocs(q).then((snap) => {
				setSearch(snap.docs.map((i) => ({ ...i.data(), id: i.id })));
			});
		}
	}

	return (
		<div className="container">
			<div className="p-2">
				<input type="text" placeholder="Search here" className="form-control" name="" id="" onKeyUp={keyUp} />
			</div>
			{search != null && (
				<div>
					<h2>Search Results</h2>

					{search.length == 0 ? "No results" : search.map((i) => <ShopViewCard key={i.id} data={i} />)}
				</div>
			)}
			<div>
				<h2>Nearby shops</h2>
				<div>
					{nearby.map((i) => (
						<ShopViewCard key={i.id} data={i} />
					))}
				</div>
			</div>
		</div>
	);
}

function ShopViewCard({ data }) {
	const [img, setImg] = useState(null);
	useEffect(() => {
		const r = ref(Storage, "shop/" + data.id);
		getDownloadURL(r).then(setImg);
	}, []);

	return (
		<div>
			<h3>{data.shopName}</h3>
			<img width={200} src={img} alt="" />
		</div>
	);
}

export default UserHome;
