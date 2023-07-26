import { Navigate, Outlet } from "react-router-dom";
import SidePanel from "./SidePanel/SidePanel";
import "./User.css";
import { useAuth } from "../../Context/AuthContext";

function User() {
	const auth = useAuth();

	if (auth.user === undefined) return;
	if (auth.user === null) return <Navigate to="/sign_in" />;
	if (auth.type == "owner") return <Navigate to="/owner" />;

	return (
		<div className="main">
			<div className="side">
				<SidePanel />
			</div>

			<div className="content">
				<Outlet />
			</div>
		</div>
	);
}

export default User;
