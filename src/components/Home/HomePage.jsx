import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import OwnerView from "./OwnerView";
import UserView from "./UserView";
import { doc, getDoc } from "firebase/firestore";
import { fs } from "../../firebase_init";
import { useEffect, useState } from "react";

function HomePage() {
   const auth = useAuth();
   const [user, setUser] = useState();

   useEffect(() => {
      if (auth === undefined || auth === null) return;
      var d = doc(fs, "users", auth.uid);
      getDoc(d).then((dc) => {
         setUser(dc.data());
      });
   }, [auth]);

   if (auth === null) {
      return <Navigate to="/sign_in" />;
   }
   if (user == undefined) return "Loading...";

   if (user.type == "user") {
      return <UserView />;
   }
   return <OwnerView />;
}

export default HomePage;
