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
				setData({ user: null, type: null, data: null });
			} else {
				const d1 = doc(FS, "users", user.uid);
				const d2 = doc(FS, "shops", user.uid);
				getDoc(d1).then((snap) => {
					if (snap.data()) setData({ type: "user", user, data: snap.data() });
				});
				getDoc(d2).then((snap) => {
					if (snap.data()) setData({ type: "owner", user, data: snap.data() });
				});
			}
		});
	}, []);

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
