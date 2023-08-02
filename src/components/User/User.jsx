import { Navigate, Outlet } from "react-router-dom";
import SidePanel from "./SidePanel/SidePanel";
import "./User.scss";
import { useAuth } from "../../Context/AuthContext";
import { Suspense, useRef, useState } from "react";
import Loading from "../Loading/Loading";

function User() {
	const auth = useAuth();
	const side = useRef(null);
	const [show, setShow] = useState(true);

	if (auth.user === undefined) return;
	if (auth.user === null) return <Navigate to="/sign_in" />;
	if (auth.type == "owner") return <Navigate to="/owner" />;

	return (
		<div className="main">
			<div ref={side} className={"side" + (show ? " side-close" : "")}>
				<SidePanel />

				<button
					onClick={() => {
						setShow((a) => !a);
					}}
					className="side-btn"
				>
					{show ? ">" : "<"}
				</button>
			</div>

			<div className="content">
				<Suspense fallback={<Loading />}>
					<Outlet />
				</Suspense>
			</div>
		</div>
	);
}

export default User;
