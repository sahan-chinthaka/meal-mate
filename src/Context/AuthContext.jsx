import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { Auth, FS } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext({});

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [data, setData] = useState({});

	useEffect(() => {
		return onAuthStateChanged(Auth, (user) => {
			if (user == null) {
				setData({ user: null, type: null });
			} else {
				const d = doc(FS, "users", user.uid);
				getDoc(d).then((snap) => {
					setData({ type: snap.data() ? "user" : "owner", user });
				});
			}
		});
	}, []);

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
