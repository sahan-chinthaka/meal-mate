function SignInPage() {
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
               />
            </div>
            <div className="form-group">
               <label htmlFor="pw">Password</label>
               <input
                  type="password"
                  id="pw"
                  placeholder="Password"
                  className="form-control"
               />
            </div>

            <button className="btn btn-primary">Sign In</button>
         </form>
      </div>
   );
}

export default SignInPage;
