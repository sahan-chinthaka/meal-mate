import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase_init";
import "./sign_up.css";

function SignUpPage() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [pw, setPw] = useState("");
   const [pwc, setPwc] = useState("");
   const [error, setError] = useState(null);
   const [type, setType] = useState(true);

   function signUp(e) {
      e.preventDefault();
      setError(null);

      if (pw != pwc) {
         setError("Password does not match");
         return;
      }

      createUserWithEmailAndPassword(auth, email, pw)
         .then((cred) => {
            updateProfile(cred.user, {
               displayName: name,
               photoURL: type + "",
            });
            window.location = "/";
         })
         .catch((error) => setError(error.message));
   }

   return (
      <div className="container">
         <div className="sign-data">
            <h2>Create an account here</h2>

            <form onSubmit={signUp} role="form" className="form-horizontal">
               <div className="form-group">
                  <label htmlFor="name">Your name</label>
                  <input
                     type="text"
                     id="name"
                     className="form-control"
                     onChange={(e) => setName(e.target.value)}
                     value={name}
                     placeholder="Your name"
                  />
               </div>
               <div className="row form-group m-3">
                  <div className="form-check col-md-6">
                     <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexRadioDefault1"
                        checked={type}
                        onChange={() => setType(true)}
                     />
                     <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                     >
                        I'm looking for food
                     </label>
                  </div>
                  <div className="form-check col-md-6">
                     <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexRadioDefault2"
                        checked={!type}
                        onChange={() => setType(false)}
                     />
                     <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                     >
                        I'm a shop owner
                     </label>
                  </div>
               </div>
               <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                     type="email"
                     placeholder="Email Address"
                     className="form-control"
                     required
                     id="email"
                     onChange={(e) => setEmail(e.target.value)}
                     value={email}
                  />
               </div>

               <div className="row">
                  <div className="form-group col-md-6">
                     <label>Password</label>
                     <input
                        type="password"
                        className="form-control"
                        required
                        placeholder="password"
                        onChange={(e) => setPw(e.target.value)}
                        value={pw}
                     />
                  </div>
                  <div className="form-group col-md-6">
                     <label>Confirm Password</label>
                     <input
                        type="password"
                        className="form-control"
                        required
                        placeholder="Password"
                        onChange={(e) => setPwc(e.target.value)}
                        value={pwc}
                     />
                  </div>
               </div>
               {error != null && (
                  <div className="alert alert-danger">{error}</div>
               )}

               <button type="submit" className="btn btn-primary my-2">
                  Sign Up
               </button>

               <p>
                  Already have an account?
                  <NavLink to="/sign_in">sign in</NavLink>
               </p>
            </form>
         </div>
      </div>
   );
}

export default SignUpPage;
