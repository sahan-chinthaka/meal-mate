import { Outlet } from "react-router-dom";

function User() {
	return (
		<>
			<div>Side panel</div>

			<Outlet />
		</>
	);
}

export default User;
