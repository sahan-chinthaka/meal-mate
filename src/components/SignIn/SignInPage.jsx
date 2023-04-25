import { useState } from "react";
import { NavLink } from "react-router-dom";

function SignInPage() {
   const [email, setEmail] = useState("");
   const [pw, setPw] = useState("");

   return (
      <div className="container">
         <h1>Sign in here</h1>

         <form>
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
