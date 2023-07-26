import { useAuth } from "../../../Context/AuthContext";

function UserHome() {
	const auth = useAuth();
	return (
		<div>
			<pre>Home</pre>
         <a href="/sign_in">Sign In</a>
		</div>
	);
}

export default UserHome;
