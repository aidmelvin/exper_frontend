import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {
  LOGIN_SUCCESS,
} from "../constants/Constants";

import { login } from '../logic/auth';
import { textBoxStyles } from './styles';

function Login() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const submit = async () => {
    const response = await login(email, password);
    if (response === LOGIN_SUCCESS) {
        navigate("/home");
    }
    else {
        alert("Login failed. Please try again");
    }
  }

  return (
    <div className="App">
        <h3>Login</h3>
        <TextField 
          label="University Email"
          sx={textBoxStyles}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <br />
        <br />
        <TextField 
          label="Password"
          sx={textBoxStyles}
          type="password"
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <br />
        <br />
        <Button 
            variant="outlined"
            onClick={async () => {await submit()}}
        >Log In</Button>
        <br />
        <p>No account? <Link to="/create-account">Create one!</Link></p>
    </div>
  );
}

export default Login;
