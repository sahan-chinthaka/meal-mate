import { signOut } from "firebase/auth";
import { auth } from "../../firebase_init";

function ProfilePage() {
   return (
      <div className="container">
         <h1>hello</h1>

         <button
            onClick={() => {
               signOut(auth).then(() => {
                  window.location = "/";
               });
            }}
         >
            Log out
         </button>
      </div>
   );
}

export default ProfilePage;
