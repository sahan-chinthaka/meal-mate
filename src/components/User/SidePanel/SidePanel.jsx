import "./SidePanel.scss";
import { useAuth } from "../../../Context/AuthContext";
import { NavLink } from "react-router-dom";

function SidePanel() {
	const auth = useAuth();

	return (
		<div className="side-panel">
			<br />
			<h2>Meal Mate</h2>
			<hr />
			<img src="/mm_logo2.png" alt="" />
			{auth.user != null && <div style={{ textAlign: "center" }}>Welcome {auth.user.displayName}</div>}
			<hr />

			<div>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/shop">Shops</NavLink>
					</li>
					<li>
						<NavLink to="/orders">Orders</NavLink>
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
