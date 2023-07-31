import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from "./components/User/Profile/Profile";
import { AuthProvider } from "./Context/AuthContext";
import SignIn from "./components/SignIn/SignIn";
import UserHome from "./components/User/Home/Home";
import Shop from "./components/User/Shop/Shop";
import User from "./components/User/User";
import Owner from "./components/Owner/Owner";
import Overview from "./components/Owner/Overview/Overview";
import Foods from "./components/Owner/Foods/Foods";

const router = createBrowserRouter([
	{
		path: "/",
		element: <User />,
		children: [
			{
				index: true,
				element: <UserHome />,
			},
			{
				path: "profile",
				element: <UserProfile />,
			},
			{
				path: "shop/:shopID",
				element: <Shop />,
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
	{
		path: "/owner",
		element: <Owner />,
		children: [
			{
				index: true,
				element: <Overview />,
			},
			{
				path: "foods",
				element: <Foods />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<RouterProvider router={router} />
	</AuthProvider>
);
