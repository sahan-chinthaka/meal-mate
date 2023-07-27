import { Navigate, Outlet } from "react-router-dom";
import SidePanel from "./SidePanel/SidePanel";
import "./User.scss";
import { useAuth } from "../../Context/AuthContext";
import { useRef, useState } from "react";

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
				<Outlet />
			</div>
		</div>
	);
}

export default User;
