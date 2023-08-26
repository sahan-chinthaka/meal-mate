import { signOut } from "firebase/auth";
import { Auth, FS } from "../../../firebase";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../../Context/AuthContext";

function UserProfile() {
	const auth = useAuth();
	const [data, setData] = useState({});
	const [dis, setDis] = useState(false);

	useEffect(() => {
		const d = doc(FS, "users", auth.user.uid);
		getDoc(d).then((snap) => setData(snap.data()));
	}, []);

	function update() {
		const d = doc(FS, "users", auth.user.uid);
		setDis(true);
		updateDoc(d, {
			address: data.address,
		}).then((_) => setDis(false));
	}

	return (
		<div className="container">
			<div>
				<p>User Name: {data.name}</p>
				<hr />
				<p>Email: {data.email}</p>
				<hr />
				<p>District: {data.district}</p>
				<hr />
				<p>City: {data.city}</p>
				<hr />
				<div className="form-group">
					<label htmlFor="address">Address:</label>
					<textarea
						onChange={(e) => {
							setData((a) => ({ ...a, address: e.target.value }));
						}}
						value={data.address}
						placeholder="Address"
						className="form-control"
						name="address"
						id="address"
						rows="3"
					></textarea>
				</div>
			</div>
			<div className="mt-3">
				<button disabled={dis} onClick={update} className="btn btn-primary me-1">
					Update
				</button>
				<button onClick={() => signOut(Auth)} className="btn btn-warning">
					Sign Out
				</button>
			</div>
		</div>
	);
}

export default UserProfile;
