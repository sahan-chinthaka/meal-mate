import { NavLink } from "react-router-dom";
import "./nav_bar.scss";

function NavBar() {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/owner">Overview</NavLink>
				</li>
				<li>
					<NavLink to="/owner/foods">Foods</NavLink>
				</li>
				<li>
					<NavLink to="/owner/orders">Orders</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
