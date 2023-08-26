import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { FS, Storage } from "../../../firebase";
import "./Foods.scss";

function Foods() {
	const auth = useAuth();
	const [foodList, setFoodList] = useState([]);

	useEffect(() => {
		updateFoods();
	}, []);

	function updateFoods() {
		const c = collection(FS, "shops", auth.user.uid, "foods");
		getDocs(c).then((snap) => {
			setFoodList(snap.docs.map((i) => ({ ...i.data(), id: i.id })));
		});
	}

	function deleteItem(foodID) {
		const d = doc(FS, "shops", auth.user.uid, "foods", foodID);
		const r = ref(Storage, "foods/" + auth.user.uid + "/" + foodID);
		deleteObject(r);
		deleteDoc(d).then(updateFoods);
	}

	return (
		<div className="container owner-foods">
			<NewFood />

			{foodList.map((i) => (
				<FoodView deleteItem={deleteItem} key={i.id} data={i} />
			))}
		</div>
	);
}

function FoodView({ data, deleteItem }) {
	const auth = useAuth();
	const [img, setImg] = useState(null);
	const [dis, setDis] = useState(false);

	useEffect(() => {
		const r = ref(Storage, "foods/" + auth.user.uid + "/" + data.id);
		getDownloadURL(r).then(setImg);
	}, []);

	function makeAvailable() {
		const d = doc(FS, "shops", auth.user.uid, "foods", data.id);
		setDis(true);
		data.available = data.available === false ? true : false;
		updateDoc(d, {
			available: data.available,
		}).then((_) => setDis(false));
	}

	return (
		<div className="owner-food-item">
			<div>{img && <img width={100} src={img} alt="" />}</div>
			<div>
				<b>{data.name}</b>
				<br />
				{data.description}
				<br />
				<button disabled={dis} onClick={(_) => deleteItem(data.id)} className="btn btn-danger me-2">
					Delete
				</button>
				<button disabled={dis} onClick={makeAvailable} className="btn btn-info">
					{data.available === false ? "Set as Available" : "Set as not Available"}
				</button>
			</div>
		</div>
	);
}

function NewFood() {
	const form = useRef(null);
	const auth = useAuth();
	const [dis, setDis] = useState(false);

	function add() {
		const name = form.current[0].value;
		const desc = form.current[1].value;
		const price = form.current[2].value;
		const files = form.current[3].files;
		setDis(true);

		const c = collection(FS, "shops", auth.user.uid, "foods");
		addDoc(c, {
			name: name,
			description: desc,
			price: price,
			available: true,
		}).then((doc) => {
			if (files.length > 0) {
				const r = ref(Storage, "foods/" + auth.user.uid + "/" + doc.id);
				uploadBytes(r, files[0]).then((_) => setDis(false));
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

				<button disabled={dis} type="button" onClick={add} className="btn btn-success">
					Add
				</button>
			</form>
		</div>
	);
}

export default Foods;
