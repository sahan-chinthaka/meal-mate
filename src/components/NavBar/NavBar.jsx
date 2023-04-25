import { NavLink } from "react-router-dom";
import profile_img from "../../assets/profile.png";
import "./nav_bar.css";
import mm_png from './mm_png.png';

function NavBar() {
   return (
      <div className="nav-bar">
         <div className="logo-container">
            <NavLink to="/"><img className="logo" src={mm_png} /></NavLink>
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
            <img className="profile-img" src={profile_img} alt="" />
            <span>Profile</span>
         </div>
      </div>
   );
}

export default NavBar;
