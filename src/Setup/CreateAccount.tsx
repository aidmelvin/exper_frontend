import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signup } from '../logic/auth';

import { 
    SIGNUP_SUCCESS
} from "../constants/Constants";

function CreateAccount() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [university, setUniversity] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const submit = async () => {
    // code to run when user clicks "Sign Up button"
    if (password === confirmPassword) {
        const response = await signup(firstName, lastName, university, email, year, gender, bio, phoneNumber, password);
        if (response === SIGNUP_SUCCESS) {
            // redirect
            alert("Sign-up succesful! You will be re-directed to the login page now");
            navigate("/login");
        }
        else {
            alert("Sign-up failed. Please try again");
        }
        console.log(response);
    }
    else {
        alert("Passwords must match");
    }
  }

  return (
    <div className="App">
        <h3>Create Account</h3>
        <input 
            className="loginField" 
            type="text" 
            placeholder="First Name"
            onChange={e => {setFirstName(e.target.value)}} />
        <br />
        <input 
            className="loginField" 
            type="text" 
            placeholder="Last Name"
            onChange={e => {setLastName(e.target.value)}} />
        <br />
        <input 
            className="loginField" 
            type="text" 
            placeholder="University"
            onChange={e => {setUniversity(e.target.value)}} />
        <br />
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
        <input 
            className="loginField" 
            type="text" 
            placeholder="Confirm password"
            onChange={e => {setConfirmPassword(e.target.value)}} />
        <br />
        <input 
            className="loginField" 
            type="text" 
            placeholder="Year (optional)"
            onChange={e => {setYear(e.target.value)}} />
        <br />
        <input 
            className="loginField" 
            type="text" 
            placeholder="Gender"
            onChange={e => {setGender(e.target.value)}} />
        <br />
        <input 
            className="loginField" 
            type="text" 
            placeholder="Short bio (optional)"
            onChange={e => {setBio(e.target.value)}} />
        <br />
        <input 
            className="loginField" 
            type="text" 
            placeholder="Phone Number (optional)"
            onChange={e => {setPhoneNumber(e.target.value)}} />
        <br />
        <button 
            className="loginButton"
            onClick={async () => {await submit()}}>Sign up!</button>
        <br />
        <p>Already have an account? <Link to="/login">Login!</Link></p>
    </div>
  );
}

export default CreateAccount;
