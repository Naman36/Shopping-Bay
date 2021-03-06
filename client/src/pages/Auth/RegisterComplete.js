import React, { useState, useEffect, useReducer } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password){
      toast.error('Email and Password is required')
      return
    }
    if (password.length < 6){
      toast.error('Password must be 6 characters long ')
      return
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        //redux store
        console.log("user: ", user, "idToken: ", idTokenResult);
        // history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const completeRegisterationForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} disabled />
        <br />
        <input
          type="password"
          className="form-control"
          value={password}
          autoFocus
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <button type="submit" className="btn btn-raised">
          Register
        </button>
      </form>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete your Registration</h4>

          {completeRegisterationForm()}
        </div>
      </div>
    </div>
  );
};
export default RegisterComplete;
