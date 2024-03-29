import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Auth, FS } from "../../firebase";
import CashierLogo from "./assets/cashier.jpg";
import Districts from "./assets/districts.json";
import FoodLogo from "./assets/food.jpg";
import "./sign_up.scss";

function SignUp() {
	const [view, setView] = useState(0);
	const [Cities, setCities] = useState([]);

	useEffect(() => {
		import("./assets/cities.json").then((p) => setCities(p.default));
	}, []);

	return (
		<div className="container">
			<div className="sign-holder">
				<h3>Create an Account</h3>
				<img src="/mm_logo2.png" alt="" />
				{view === 0 && (
					<>
						<div className="type-sel" onClick={() => setView(1)}>
							<img width="100" src={FoodLogo} />
							<span>I'm looking for food</span>
						</div>
						<div className="type-sel" onClick={() => setView(2)}>
							<img width="100" src={CashierLogo} />
							<span>I'm selling food</span>
						</div>
					</>
				)}
				{view === 1 && <UserSignUp Cities={Cities} />}
				{view === 2 && <OwnerSignUp Cities={Cities} />}
			</div>
		</div>
	);
}

function UserSignUp({ Cities }) {
	const [dId, setDID] = useState(1);
	const [err, setErr] = useState(null);
	const [dis, setDis] = useState(false);
	const form = useRef(null);
	const navigate = useNavigate();

	function submit(e) {
		e.preventDefault();
		setErr(null);
		const email = form.current[0].value;
		const name = form.current[1].value;
		const dis = form.current[2].value;
		const city = form.current[3].value;
		const pw = form.current[4].value;
		const pwc = form.current[5].value;

		if (name.length <= 3) return setErr("Enter a valid name");
		if (pw.length < 6) return setErr("Password minimum length should be 6");
		if (pw !== pwc) return setErr("Passwords are not same");
		setDis(true);

		createUserWithEmailAndPassword(Auth, email, pw)
			.then((cred) => {
				const user = cred.user;
				updateProfile(user, {
					displayName: name,
				});

				const d = Districts[dis - 1];
				const c = Cities.filter((i) => i.a == dis)[city];
				const disN = d["name_en"] + " " + d["name_si"];
				const cityN = c["b"] + " " + c["c"];

				setDoc(doc(FS, "users", user.uid), {
					email,
					name,
					district: disN,
					city: cityN,
					lati: c["d"],
					long: c["e"],
				})
					.then(() => (window.location.href = "/"))
					.catch((err) => setErr(err.code));
			})
			.catch((err) => {
				if (err.code == "auth/email-already-in-use") return setErr("Email already in use");
				if (err.code == "auth/invalid-email") return setErr("Invalid email address");
				return setErr(err.code);
			})
			.finally(() => {
				setDis(false);
			});
	}

	return (
		<div>
			<form ref={form} onSubmit={submit}>
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						className="form-control"
						id="email"
						aria-describedby="emailHelp"
						placeholder="Enter email"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="name">Your name</label>
					<input required type="text" name="name" id="name" placeholder="Name" className="form-control" />
				</div>
				<div className="form-group">
					<label htmlFor="distric">District</label>
					<select name="distric" id="distric" className="form-control" onChange={(e) => setDID(e.target.value)}>
						{Districts.map((i) => (
							<option key={i.id} value={i.id}>
								{i.name_en} - {i.name_si}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="city">City</label>
					<select name="city" id="city" className="form-control">
						{Cities.filter((i) => i.a == dId).map((i, k) => (
							<option key={k} value={k}>
								{i.b} - {i.c}
							</option>
						))}
					</select>
				</div>
				<div className="form-group row">
					<div className="form-group col">
						<label htmlFor="pw">Password</label>
						<input required name="pw" type="password" className="form-control" id="pw" placeholder="Password" />
					</div>
					<div className="form-group col">
						<label htmlFor="pwc">Password Confirm</label>
						<input required name="pwc" type="password" className="form-control" id="pwc" placeholder="Password" />
					</div>
				</div>
				{err !== null && <div className="alert alert-danger">{err}</div>}
				<div className="form-group">
					<button disabled={dis} type="submit" className="btn btn-primary">
						Sign Up
					</button>
				</div>
				Already have an account.&nbsp;
				<NavLink to="/sign_in">Sign in here</NavLink>
			</form>
		</div>
	);
}

function OwnerSignUp({ Cities }) {
	const [dId, setDID] = useState(1);
	const [err, setErr] = useState(null);
	const [dis, setDis] = useState(false);
	const form = useRef(null);
	const navigate = useNavigate();

	function submit(e) {
		e.preventDefault();
		setErr(null);

		const email = form.current[0].value;
		const shopName = form.current[1].value;
		const shopContact = form.current[2].value;
		const shopAddress = form.current[3].value;
		const dis = form.current[4].value;
		const city = form.current[5].value;
		const pw = form.current[6].value;
		const pwc = form.current[7].value;

		if (shopName.length < 2) return setErr("Enter a valid name");
		if (pw.length < 6) return setErr("Password minimum length should be 6");
		if (pw !== pwc) return setErr("Passwords are not same");

		const d = Districts[dis - 1];
		const c = Cities.filter((i) => i.a == dis)[city];
		const disN = d["name_en"] + " " + d["name_si"];
		const cityN = c["b"] + " " + c["c"];
		setDis(true);

		createUserWithEmailAndPassword(Auth, email, pw)
			.then((cred) => {
				const user = cred.user;

				setDoc(doc(FS, "shops", user.uid), {
					email,
					shopName,
					district: disN,
					city: cityN,
					shopContact,
					shopAddress,
					lati: c["d"],
					long: c["e"],
				})
					.then(() => (window.location.href = "/"))
					.catch((err) => setErr(err.code));
			})
			.catch((err) => {
				if (err.code == "auth/email-already-in-use") return setErr("Email already in use");
				if (err.code == "auth/invalid-email") return setErr("Invalid email address");
				return setErr(err.code);
			})
			.finally(() => {
				setDis(false);
			});
	}

	return (
		<div>
			<form onSubmit={submit} ref={form}>
				<div className="form-group">
					<label htmlFor="email">Email Address</label>
					<input required type="email" name="email" id="email" placeholder="Email" className="form-control" />
				</div>
				<div className="form-group">
					<label htmlFor="shop-name">Shop Name</label>
					<input required type="text" name="shop-name" id="shop-name" placeholder="Name" className="form-control" />
				</div>
				<div className="form-group">
					<label htmlFor="shop-contact">Shop Contact Number</label>
					<input type="text" name="shop-contact" id="shop-contact" placeholder="Contact" className="form-control" />
				</div>
				<div className="form-group">
					<label htmlFor="shop-address">Shop Address</label>
					<textarea
						required
						name="shop-address"
						id="shop-address"
						rows="5"
						className="form-control"
						placeholder="Address"
					></textarea>
				</div>
				<div className="form-group">
					<label htmlFor="distric">District</label>
					<select name="distric" id="distric" className="form-control" onChange={(e) => setDID(e.target.value)}>
						{Districts.map((i) => (
							<option key={i.id} value={i.id}>
								{i.name_en} - {i.name_si}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="city">City</label>
					<select name="city" id="city" className="form-control">
						{Cities.filter((i) => i.a == dId).map((i, k) => (
							<option key={k} value={k}>
								{i.b} - {i.c}
							</option>
						))}
					</select>
				</div>
				<div className="row">
					<div className="form-group col">
						<label htmlFor="pw">Password</label>
						<input required name="pw" type="password" className="form-control" id="pw" placeholder="Password" />
					</div>
					<div className="form-group col">
						<label htmlFor="pwc">Password Confirm</label>
						<input required name="pwc" type="password" className="form-control" id="pwc" placeholder="Password" />
					</div>
				</div>
				{err !== null && <div className="alert alert-danger">{err}</div>}
				<div className="form-group">
					<button disabled={dis} type="submit" className="btn btn-primary">
						Sign Up
					</button>
				</div>
				Already have an account.&nbsp;
				<NavLink to="/sign_in">Sign in here</NavLink>
			</form>
		</div>
	);
}

export default SignUp;
