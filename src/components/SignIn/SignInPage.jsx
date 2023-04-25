import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase_init";

function SignInPage() {
   const [email, setEmail] = useState("");
   const [pw, setPw] = useState("");
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   function signIn(e) {
      e.preventDefault();
      setError(null);
      signInWithEmailAndPassword(auth, email, pw)
         .then(() => navigate("/"))
         .catch((error) => {
            setError(error.message);
         });
   }

   return (
      <div className="container">
         <h1>Sign in here</h1>

         <form onSubmit={signIn}>
            <div className="form-group">
               <label htmlFor="email">Email Address</label>
               <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
               />
            </div>
            <div className="form-group">
               <label htmlFor="pw">Password</label>
               <input
                  type="password"
                  id="pw"
                  placeholder="Password"
                  className="form-control"
                  onChange={(e) => setPw(e.target.value)}
                  value={pw}
               />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-primary">
               Sign In
            </button>
            <p>
               Don't have an account?
               <NavLink to={"/sign_up"}>create account</NavLink>
            </p>
         </form>
      </div>
   );
}

export default SignInPage;
