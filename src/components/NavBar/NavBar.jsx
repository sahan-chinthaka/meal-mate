import { NavLink } from "react-router-dom";
import profile_img from "../../assets/profile.png";
import "./nav_bar.css";
import { useAuth } from "../../context/AuthContext";

function NavBar() {
   const auth = useAuth();
   return (
      <div className="nav-bar">
         <div className="logo-container">
            <NavLink to="/">Meal Mate</NavLink>
         </div>
         <nav className="nav-list">
            <ul>
               <li>
                  <NavLink to="/">Home</NavLink>
               </li>
               <li>
                  <NavLink to="/shop">Shop</NavLink>
               </li>
               <li>
                  <NavLink to="/facourite">Favourite</NavLink>
               </li>
               <li>
                  <NavLink to="/about">About</NavLink>
               </li>
            </ul>
         </nav>
         <div className="account-data">
            {auth != null ? (
               <>
                  <img className="profile-img" src={profile_img} alt="" />
                  <span>Profile</span>
               </>
            ) : (
               <>
                  <NavLink to="/sign_in">Sign In</NavLink>
               </>
            )}
         </div>
      </div>
   );
}

export default NavBar;
