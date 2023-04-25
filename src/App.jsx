import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { AuthProvider } from "./context/AuthContext";

function App() {
   return (
      <>
         <AuthProvider>
            <NavBar />

            <Outlet />
         </AuthProvider>
      </>
   );
}

export default App;
