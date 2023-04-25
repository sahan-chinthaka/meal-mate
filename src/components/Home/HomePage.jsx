import { useAuth } from "../../context/AuthContext";

function HomePage() {
   const auth = useAuth();

   return <div>{JSON.stringify(auth)}</div>;
}

export default HomePage;
