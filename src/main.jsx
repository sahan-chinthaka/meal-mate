import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/Home/HomePage.jsx";
import SignInPage from "./components/SignIn/SignInPage.jsx";
import SignUpPage from "./components/SignUp/SignUpPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePage from "./components/Profile/ProfilePage.jsx";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      children: [
         {
            index: true,
            element: <HomePage />,
         },
         {
            path: "profile",
            element: <ProfilePage />,
         },
      ],
   },
   {
      path: "/sign_in",
      element: <SignInPage />,
   },
   {
      path: "/sign_up",
      element: <SignUpPage />,
   },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
