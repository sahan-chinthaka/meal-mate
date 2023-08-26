import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Storage } from "../../firebase";
import "./shop.scss"

function ShopViewCard({ data }) {
	const [img, setImg] = useState("/loading.gif");
	useEffect(() => {
		const r = ref(Storage, "shop/" + data.id);
		getDownloadURL(r).then(setImg);
	}, []);

	return (
		<NavLink className="shop-link" style={{ textDecoration: "none" }} to={"/shop/" + data.id}>
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

export default ShopViewCard;
