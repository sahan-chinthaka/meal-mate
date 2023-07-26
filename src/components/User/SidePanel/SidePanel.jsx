import "./SidePanel.scss";
import { useAuth } from "../../../Context/AuthContext";
import { NavLink } from "react-router-dom";

function SidePanel() {
	const auth = useAuth();

	return (
		<div className="side-panel">
			<h2>Meal Mate</h2>
			<img src="/mm_logo.png" alt="" />
			{auth.user != null && <div>Welcome {auth.user.displayName}</div>}
			<div>
				<a href="/sign_in" className="btn btn-warning">
					Sign In
				</a>
				<a href="/sign_up" className="btn btn-warning">
					Sign Up
				</a>
			</div>
			<div>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/shops">Shops</NavLink>
					</li>
					<li>
						<NavLink to="/profile">Profile</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default SidePanel;
