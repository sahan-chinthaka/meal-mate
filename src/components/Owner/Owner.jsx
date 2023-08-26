import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import { useAuth } from "../../Context/AuthContext";
import { Suspense } from "react";

function Owner() {
	const auth = useAuth();

	if (auth.user === undefined) return;
	if (auth.user === null) return <Navigate to="/sign_in" />;
	if (auth.type == "user") return <Navigate to="/" />;

	return (
		<div>
			<NavBar />

			<div className="container" style={{ background: "white", padding: "10px" }}>
				<Suspense fallback="">
					<Outlet />
				</Suspense>
			</div>
		</div>
	);
}

export default Owner;
