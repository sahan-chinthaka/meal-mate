import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import { useAuth } from "../../Context/AuthContext";

function Owner() {
	const auth = useAuth();

	if (auth.user === undefined) return;
	if (auth.user === null) return <Navigate to="/sign_in" />;
	if (auth.type == "user") return <Navigate to="/" />;

	return (
		<div>
			<NavBar />

			<Outlet />
		</div>
	);
}

export default Owner;
