import { useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { and, collection, getDocs, limit, or, orderBy, query, where } from "firebase/firestore";
import { FS, Storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import "./Home.scss";
import { NavLink } from "react-router-dom";

function UserHome() {
	const auth = useAuth();
	const [nearby, setNearby] = useState([]);
	const [search, setSearch] = useState(null);

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
			<div>
				<input type="text" placeholder="Search here" className="form-control" name="" id="" onKeyUp={keyUp} />
			</div>
			{search != null && (
				<div>
					<br />
					<h2>Search Results</h2>

					{search.length == 0 ? "No results" : search.map((i) => <ShopViewCard key={i.id} data={i} />)}
				</div>
			)}
			<div>
				<div className="p-1"></div>
				<h2>Suggested shops</h2>
				<div className="shop-holder pt-2">
					{nearby.map((i) => (
						<ShopViewCard key={i.id} data={i} />
					))}
				</div>
			</div>
		</div>
	);
}

function ShopViewCard({ data }) {
	const [img, setImg] = useState("/loading.gif");
	useEffect(() => {
		const r = ref(Storage, "shop/" + data.id);
		getDownloadURL(r).then(setImg);
	}, []);

	return (
		<div className="shop-view">
			<div className="title">
				<NavLink to={"shop/" + data.id}>{data.shopName}</NavLink>
			</div>
			<img width={200} src={img} alt="" />
		</div>
	);
}

export default UserHome;
