import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FS, Storage } from "../../../firebase";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuth } from "../../../Context/AuthContext";

function NewOrder() {
	const loc = useLocation();
	const state = loc.state;
	const [img, setImg] = useState(null);
	const form = useRef();
	const auth = useAuth();
	const [q, setQ] = useState(1);
	const total = parseInt(q) * parseFloat(state.price);
	const [dis, setDis] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const r = ref(Storage, "foods/" + state.shopID + "/" + state.id);
		getDownloadURL(r).then(setImg);
	}, []);

	if (state === null) return <Navigate to="/orders" />;

	function buyClick(e) {
		e.preventDefault();
		setDis(true);
		const col = collection(FS, "orders");
		addDoc(col, {
			shopID: state.shopID,
			foodID: state.id,
			userID: auth.user.uid,
			quantity: q,
			total,
			created: serverTimestamp(),
			state: "ordered",
		}).then(() => navigate("/orders"));
	}

	return (
		<div className="new-order">
			<img width="100%" src={img} style={{ maxWidth: "400px", borderRadius: "10px" }} alt="" />
			<h2>{state.name}</h2>

			<form ref={form} onSubmit={buyClick}>
				<div className="form-group">
					<label htmlFor="quantity">Quantity</label>
					<input
						value={q}
						onChange={(e) => setQ(e.target.value)}
						className="form-control"
						type="number"
						name="quantity"
						id="quantity"
						placeholder="Quantity"
						min="1"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="address">Address</label>
					<textarea name="address" className="form-control" id="address" rows="4" placeholder="Address"></textarea>
				</div>
				<div className="d-flex">
					<b>Total: </b> {isNaN(total) ? parseFloat(state.price) : total}
					<button disabled={dis} style={{ marginLeft: "auto" }} className="btn btn-warning">
						Buy
					</button>
				</div>
			</form>
		</div>
	);
}

export default NewOrder;
