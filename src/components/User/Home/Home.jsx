import { useEffect, useRef, useState } from "react";
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
	const input = useRef(null);
	const [dis, setDis] = useState(false);
	const lastSearch = useRef("");

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
			searchEvent(e.target.value);
		}
	}

	function searchEvent(txt) {
		const text = txt.trim();
		if (text.length < 1) return;
		setDis(true);
		lastSearch.current = text;

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

		getDocs(q)
			.then((snap) => {
				setSearch(snap.docs.map((i) => ({ ...i.data(), id: i.id })));
			})
			.finally(() => setDis(false));
	}

	return (
		<div className="container">
			<div style={{ display: "flex" }}>
				<input ref={input} type="text" placeholder="Search here" className="form-control" name="" id="" onKeyUp={keyUp} />
				<button disabled={dis} className="btn btn-warning mx-1" onClick={() => searchEvent(input.current.value)}>
					Search
				</button>
			</div>
			{search != null && (
				<div>
					<br />
					<h2>Search results for "{lastSearch.current}"</h2>

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
		<NavLink className="shop-link" style={{ textDecoration: "none" }} to={"shop/" + data.id}>
			<div className="shop-view" style={{ backgroundImage: `url("${img}")` }}>
				<div className="title">
					<h3>{data.shopName}</h3>
					<hr />
					<p>{data.city}</p>
				</div>
			</div>
		</NavLink>
	);
}

export default UserHome;
