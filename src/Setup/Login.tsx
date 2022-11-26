import React, { useState } from 'react';
import { Link } from "react-router-dom";

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../constants/Constants";

import { login } from '../logic/auth';

function Login() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submit = async () => {
    // code to run when user clicks "Sign Up button"
    const response = await login(email, password);
    if (response === LOGIN_SUCCESS) {
        // redirect
        alert("Successful login. Redirect to home page");
        // server-side redirect ?
        // navigate("/login");
    }
    else {
        alert("Login failed. Please try again");
    }
  }

  return (
    <div className="App">
        <h3>Login</h3>
        <input
            className="loginField" 
            type="text" 
            placeholder="University Email"
            onChange={e => {setEmail(e.target.value)}} />
        <br />
        <input
            className="loginField"
            type="text" 
            placeholder="Password"
            onChange={e => {setPassword(e.target.value)}} />
        <br />
        <button 
          className="loginButton"
          onClick={async () => {await submit()}}>Log in</button>
        <br />
        <p>No account? <Link to="/create-account">Create one!</Link></p>
    </div>
  );
}

export default Login;
