import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./components/User/User";
import Home from "./components/User/Home/Home";
import Profile from "./components/User/Profile/Profile";
import { AuthProvider } from "./Context/AuthContext";
import SignIn from "./components/SignIn/SignIn";

const router = createBrowserRouter([
	{
		path: "/",
		element: <User />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
		],
	},
	{
		path: "/sign_up",
		element: <SignUp />,
	},
	{
		path: "/sign_in",
		element: <SignIn />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
