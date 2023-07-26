import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useReducer, useRef, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { FS, Storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function reducer(state, action) {
	switch (action.type) {
		case "SET_DATA":
			return action.data;
		case "SET_CONTACT":
			return { ...state, shopContact: action.data };
		case "SET_ADDRESS":
			return { ...state, shopAddress: action.data };
	}
}

function Overview() {
	const auth = useAuth();
	const [dis, setDis] = useState(false);
	const [data, dispatch] = useReducer(reducer, { shopContact: "", shopAddress: "" });
	const inp = useRef(null);
	const [img, setImg] = useState(null);

	useEffect(() => {
		getDoc(doc(FS, "shops", auth.user.uid)).then((snap) => {
			dispatch({ type: "SET_DATA", data: snap.data() });
		});

		const r = ref(Storage, "shop/" + auth.user.uid);
		getDownloadURL(r).then(setImg);
	}, []);

	function submit(e) {
		e.preventDefault();

		setDis(true);
		updateDoc(doc(FS, "shops", auth.user.uid), {
			shopAddress: data.shopAddress,
			shopContact: data.shopContact,
		}).then(() => {
			if (inp.current.files.length == 0) {
				setDis(false);
			} else {
				const r = ref(Storage, "shop/" + auth.user.uid);
				uploadBytes(r, inp.current.files[0]).then(() => {
					setDis(false);
				});
			}
		});
	}

	return (
		<div className="container">
			{img != null && <img style={{ width: "80%", margin: "10px auto", display: "block" }} src={img} alt="" />}
			<form onSubmit={submit} className="m-1">
				<div className="row">
					<div className="col-2">Name</div>
					<div className="col-10">{data.shopName}</div>
				</div>
				<div className="form-group row">
					<label htmlFor="shop-contact" className="col-2 col-form-label">
						Contact
					</label>
					<div className="col-10">
						<input
							type="text"
							className="form-control"
							id="shop-contact"
							placeholder="Contact"
							value={data.shopContact}
							onChange={(e) => dispatch({ type: "SET_CONTACT", data: e.target.value })}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="address" className="col-2">
						Address
					</label>
					<div className="col-10">
						<textarea
							name="address"
							id="address"
							className="form-control"
							rows="5"
							value={data.shopAddress}
							onChange={(e) => dispatch({ type: "SET_ADDRESS", data: e.target.value })}
						></textarea>
					</div>
				</div>
				<div className="row">
					<div className="col-2">District</div>
					<div className="col-10">{data.district}</div>
				</div>
				<div className="row">
					<div className="col-2">City</div>
					<div className="col-10">{data.city}</div>
				</div>
				<div className="row">
					<label htmlFor="img" className="col-2">
						Photo
					</label>
					<div className="col-10">
						<input ref={inp} className="form-control" accept="image/*" type="file" name="img" id="img" />
					</div>
				</div>
				<button disabled={dis} type="submit" className="btn btn-success">
					Update
				</button>
			</form>
		</div>
	);
}

export default Overview;
