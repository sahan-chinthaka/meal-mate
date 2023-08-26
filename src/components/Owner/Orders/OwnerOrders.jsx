import { useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { FS } from "../../../firebase";

function OwnerOrders() {
	const auth = useAuth();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const c = collection(FS, "orders");
		getDocs(query(c, where("shopID", "==", auth.user.uid), orderBy("created"))).then((snap) => {
			setOrders(snap.docs.map((i) => ({ ...i.data(), id: i.id })));

			const unique_users = [];
			const unqiue_foods = [];

			snap.forEach((i) => {
				const t = i.data().userID;
				if (unique_users.indexOf(t) == -1) {
					unique_users.push(t);

					const udr = doc(FS, "users", t);
					getDoc(udr).then((s) => {
						const user_data = s.data();

						setOrders((now) => {
							const temp = [...now];
							for (let index in temp) {
								if (temp[index].userID == s.id) {
									temp[index].user = user_data.name;
								}
							}
							return temp;
						});
					});
				}
				if (unqiue_foods.indexOf(i.data().foodID) == -1) {
					unqiue_foods.push(i.data().foodID);

					const fdr = doc(FS, "shops", i.data().shopID, "foods", i.data().foodID);
					getDoc(fdr).then((s) => {
						const food_data = s.data();

						setOrders((now) => {
							const temp = [...now];
							for (let index in temp) {
								if (temp[index].foodID == s.id) {
									temp[index].food = food_data.name;
									temp[index].address = food_data.address;
								}
							}
							return temp;
						});
					});
				}
			});
		});
	}, []);

	function stateChange(e, orderID) {
		const d = doc(FS, "orders", orderID);
		updateDoc(d, {
			state: e.target.value,
		});
	}

	return (
		<div className="owner-orders">
			{orders.map((i) => (
				<div key={i.id}>
					<p>
						ID: {i.id} <br />
						Date:{" "}
						{new Date(i.created.seconds * 1000).toLocaleDateString() +
							" " +
							new Date(i.created.seconds * 1000).toLocaleTimeString()}
						<br />
						User: {i.user} <br />
						Food: {i.food} <br />
						Address: {i.address}
					</p>
					<div onChange={(e) => stateChange(e, i.id)}>
						<ul>
							<li>
								<input
									defaultChecked={i.state == "Pending"}
									type="radio"
									name={"order-item-" + i.id}
									value="Pending"
									id={"order-item-1-" + i.id}
								/>
								<label htmlFor={"order-item-1-" + i.id}>Pending</label>
							</li>
							<li>
								<input
									defaultChecked={i.state == "Processing"}
									type="radio"
									name={"order-item-" + i.id}
									value="Processing"
									id={"order-item-2-" + i.id}
								/>
								<label htmlFor={"order-item-2-" + i.id}>Processing</label>
							</li>
							<li>
								<input
									defaultChecked={i.state == "Shipped"}
									type="radio"
									name={"order-item-" + i.id}
									value="Shipped"
									id={"order-item-3-" + i.id}
								/>
								<label htmlFor={"order-item-3-" + i.id}>Shipped</label>
							</li>
							<li>
								<input
									defaultChecked={i.state == "Completed"}
									type="radio"
									name={"order-item-" + i.id}
									value="Completed"
									id={"order-item-4-" + i.id}
								/>
								<label htmlFor={"order-item-4-" + i.id}>Completed</label>
							</li>
						</ul>
					</div>
				</div>
			))}
		</div>
	);
}

export default OwnerOrders;
