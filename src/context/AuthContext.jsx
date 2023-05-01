import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase_init";
import { useState } from "react";

const AuthContext = createContext();

export function useAuth() {
   return useContext(AuthContext);
}

export function AuthProvider({ children }) {
   const [currentUser, setCurrentUser] = useState(undefined);

   useEffect(
      () => onAuthStateChanged(auth, (user) => setCurrentUser(user)),
      []
   );

   return (
      <AuthContext.Provider value={currentUser}>
         {children}
      </AuthContext.Provider>
   );
}
