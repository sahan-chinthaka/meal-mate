import { signOut } from "firebase/auth";
import { Auth } from "../../../firebase";

function UserProfile() {
	return (
		<div className="container">
			<button onClick={() => signOut(Auth)} className="btn btn-primary">
				Sign Out
			</button>
		</div>
	);
}

export default UserProfile;
