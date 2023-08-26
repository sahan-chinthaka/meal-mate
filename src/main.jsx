import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";

const User = React.lazy(() => import("./components/User/User"));
const UserHome = React.lazy(() => import("./components/User/Home/Home"));
const UserProfile = React.lazy(() => import("./components/User/Profile/Profile"));
const Shop = React.lazy(() => import("./components/User/Shop/Shop"));
const ShopHome = React.lazy(() => import("./components/User/Shop/ShopHome"));
const Owner = React.lazy(() => import("./components/Owner/Owner"));
const Overview = React.lazy(() => import("./components/Owner/Overview/Overview"));
const Foods = React.lazy(() => import("./components/Owner/Foods/Foods"));
const Orders = React.lazy(() => import("./components/User/Orders/Orders"));
const NewOrder = React.lazy(() => import("./components/User/Orders/NewOrder"));

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
				path: "shop",
				element: <ShopHome />,
			},
			{
				path: "shop/:shopID",
				element: <Shop />,
			},
			{
				path: "orders",
				element: <Orders />,
			},
			{
				path: "orders/new-order",
				element: <NewOrder />,
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
