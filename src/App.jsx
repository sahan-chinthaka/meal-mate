import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import mm_long from './mm_long.png';
import search from './search.png';

function App() {
   return (
      <>
         <NavBar />

         <div className="box">
            <img className="logolong" src={mm_long}/>
         </div>

         <div className="search-container">
      <input
        className="search-bar"
        type="text"
        placeholder="Start your search..."
      />
      <button className="search-button">
      <img className="search" src={search} alt="My Image" />
      </button>
    </div>

         <Outlet />
      </>
   );
}

export default App;
