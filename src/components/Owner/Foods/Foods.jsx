import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { FS, Storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Foods() {
	const auth = useAuth();
	const [foodList, setFoodList] = useState([]);

	useEffect(() => {
		const c = collection(FS, "shops", auth.user.uid, "foods");
		getDocs(c).then((snap) => {
			setFoodList(snap.docs.map((i) => ({ ...i.data(), id: i.id })));
		});
	}, []);
	return (
		<div className="container">
			<NewFood />
			<h2>List</h2>

			{foodList.map((i) => (
				<FoodView key={i.id} data={i} />
			))}
		</div>
	);
}

function FoodView({ data }) {
	const auth = useAuth();
	const [img, setImg] = useState(null);

	useEffect(() => {
		const r = ref(Storage, "foods/" + auth.user.uid + "/" + data.id);
		getDownloadURL(r).then(setImg);
	}, []);
	return (
		<div>
			<div>{img && <img width={50} src={img} alt="" />}</div>
			<div>
				<b>{data.name}</b>
				<br />
				{data.description}
			</div>
		</div>
	);
}

function NewFood() {
	const form = useRef(null);
	const auth = useAuth();

	function add() {
		const name = form.current[0].value;
		const desc = form.current[1].value;
		const price = form.current[2].value;
		const files = form.current[3].files;

		const c = collection(FS, "shops", auth.user.uid, "foods");
		addDoc(c, {
			name: name,
			description: desc,
			price: price,
		}).then((doc) => {
			if (files.length > 0) {
				const r = ref(Storage, "foods/" + auth.user.uid + "/" + doc.id);
				uploadBytes(r, files[0]);
			}
		});
	}

	return (
		<div>
			<form ref={form}>
				<div className="form-group row">
					<label htmlFor="food-name" className="col-3">
						Food Name
					</label>
					<div className="col-9">
						<input
							required
							placeholder="Food Name"
							type="text"
							name="food-name"
							id="food-name"
							className="form-control"
						/>
					</div>
				</div>

				<div className="form-group row">
					<label htmlFor="food-desc" className="col-3">
						Food Description
					</label>
					<div className="col-9">
						<textarea
							required
							placeholder="A description about the food"
							name="food-desc"
							id="food-desc"
							rows="2"
							className="form-control"
						></textarea>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="food-price" className="col-3">
						Price (Rs)
					</label>
					<div className="col-9">
						<input
							required
							placeholder="Food Price"
							type="number"
							name="food-name"
							id="food-name"
							className="form-control"
						/>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="food-price" className="col-3">
						Image
					</label>
					<div className="col-9">
						<input type="file" accept="image/*" name="image" id="image" className="form-control" />
					</div>
				</div>

				<button type="button" onClick={add} className="btn btn-success">
					Add
				</button>
			</form>
		</div>
	);
}

export default Foods;
