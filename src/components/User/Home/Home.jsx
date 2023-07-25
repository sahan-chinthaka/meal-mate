import { useAuth } from "../../../Context/AuthContext";

function Home() {
	const auth = useAuth();
	return (
		<div>
			<pre>{JSON.stringify(auth)}</pre>
         <a href="/sign_in">Sign In</a>
		</div>
	);
}

export default Home;
