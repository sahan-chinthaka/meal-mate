import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FS, Storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

function Shop() {
	const { shopID } = useParams();
	const [data, setData] = useState({});

	useEffect(() => {
		const d = doc(FS, "shops", shopID);
		getDoc(d).then((snap) => {
			setData(snap.data());

			const r = ref(Storage, "shop/" + shopID);
			getDownloadURL(r).then((url) => setData((d) => ({ ...d, url })));
		});
	}, []);

	return (
		<div className="container">
			<h1>{data.shopName}</h1>
			<img src={data.url} width="100" />
		</div>
	);
}

export default Shop;
