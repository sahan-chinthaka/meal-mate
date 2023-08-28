import { and, collection, getDocs, limit, or, orderBy, query, where } from "firebase/firestore";
import { useRef, useState } from "react";
import { FS } from "../../../firebase";
import ShopViewCard from "../../ShopView/ShopViewCard";
import SuggestedShpos from "../../ShopView/SuggestedShops";
import "./Home.scss";
import FavFoods from "../../FavFoods/FavFoods";


function UserHome() {
	const [search, setSearch] = useState(null);
	const input = useRef(null);
	const [dis, setDis] = useState(false);
	const lastSearch = useRef("");

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
		<div style={{ 
			backgroundImage: "url('/mm_back2.png')",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			minHeight: "100vh",
		}}>
			<div style={{ display: "flex", justifyContent:"center"}}>
			<div className="search-container">
				<input ref={input} type="text" placeholder="Search here" className="form-control" name="" id="" onKeyUp={keyUp} />
				<button disabled={dis} className="btn btn-warning mx-1" onClick={() => searchEvent(input.current.value)}>
					Search
				</button>
				</div>
			</div>
			{search != null && (
				<div>
					<br />
					<h2>Search results for "{lastSearch.current}"</h2>

					{search.length == 0 ? "No results" : search.map((i) => <ShopViewCard key={i.id} data={i} />)}
				</div>
			)}
			<div className="homepage">
				<div className="hpb">
					<h1 className="title">Meal Mate</h1>
						<div>
							<h3 className="body">
								Discover a world of local flavors at Meal Mate
								Connect with nearby restaurants, explore their menus
								and order your favorite meals online.
							</h3>
						</div>
						<button className="rounded-button">Shop Now</button>
				</div>
				<div className="favfoodlist">
					<FavFoods />
				</div>
			</div>
		</div>
	);
}

export default UserHome;
