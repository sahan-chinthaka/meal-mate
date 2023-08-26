import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRef } from "react";
import { Auth } from "../../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import React, { PureComponent } from "react";
import "./sign_in.scss";

function SignIn() {
	const form = useRef(null);
	const [dis, setDis] = useState(false);
	const [err, setErr] = useState(null);
	const navigate = useNavigate();

	function submit(e) {
		e.preventDefault();
		setErr(null);

		const email = form.current[0].value;
		const pw = form.current[1].value;

		setDis(true);
		signInWithEmailAndPassword(Auth, email, pw)
			.then((cred) => (window.location.href = "/"))
			.catch((err) => {
				if (err.code == "auth/user-not-found") return setErr("User not found");
				if (err.code == "auth/wrong-password") return setErr("Wrong password");
				setErr(err.code);
			})
			.finally(() => {
				setDis(false);
			});
	}
	return (
		<div className="container">
			<div className="sign-holder">
            <h3>Sign in to Meal Mate</h3>
            <img src="/mm_logo2.png" alt="" />
				<form ref={form} onSubmit={submit}>
					<div className="form-group">
						<label htmlFor="email">Email Address</label>
						<input type="email" name="email" id="email" required placeholder="Email" className="form-control" />
					</div>
					<div className="form-group">
						<label htmlFor="pw">Password</label>
						<input type="password" name="pw" id="pw" required className="form-control" placeholder="Password" />
					</div>
					{err != null && <div className="alert alert-danger">{err}</div>}
					<div className="form-group">
						<button disabled={dis} type="submit" className="btn btn-primary">
							Sign In
						</button>
					</div>
					Don't have an account ? &nbsp;
					<NavLink to="/sign_up">Create an account</NavLink>
				</form>
			</div>
		</div>
	);
}

export default SignIn;
