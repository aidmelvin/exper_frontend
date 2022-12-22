import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signup } from '../logic/auth';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { 
    SIGNUP_SUCCESS
} from "../constants/Constants";

import { schoolList } from '../data/schools';
import { years } from '../data/years';
import { ages } from '../data/ages';
import { genders } from '../data/genders';
import { interestsList } from '../data/interests';

import { textBoxStyles } from './styles';

function CreateAccount() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [university, setUniversity] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [preference, setPreference] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [interests, setInterests] = useState<Array<string>>([]);

  const navigate = useNavigate();

  const submit = async () => {
    if (password === confirmPassword) {
        const response = await signup(firstName, lastName, university, email, year, 
                                        gender, bio, phoneNumber, password, age, preference,
                                        interests);
        if (response === SIGNUP_SUCCESS) {
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
        <TextField 
            label="First Name"
            sx={textBoxStyles}
            onChange={(e) => { setFirstName(e.target.value) }}
        />
        <br />
        <br />
        <TextField 
            label="Last Name"
            sx={textBoxStyles}
            onChange={(e) => { setLastName(e.target.value) }}
        />
        <br />
        <br />
        <Autocomplete
            id="grouped-demo"
            options={schoolList.sort((a, b) => -b.location.localeCompare(a.location))}
            groupBy={(option) => option.location}
            getOptionLabel={(option) => option.title}
            sx={textBoxStyles}
            onChange={(e, v) => {
                if (v != null) {
                    setUniversity(v.title);
                }
            }}
            renderInput={(params) => <TextField {...params} label="University" />}
        />
        <br />
        <br />
        <TextField 
            label="University Email"
            sx={textBoxStyles}
            onChange={(e) => { setEmail(e.target.value) }}
        />
        <br />
        <br />
        <TextField 
            label="Password"
            type="password"
            sx={textBoxStyles}
            onChange={(e) => { setPassword(e.target.value) }}
        />
        <br />
        <br />
        <TextField 
            label="Confirm Password"
            type="password"
            sx={textBoxStyles}
            onChange={(e) => { setConfirmPassword(e.target.value) }}
        />
        <br />
        <br />
        <Autocomplete
            onChange={(event: any, newValue: string | null) => {
                if (newValue != null) {
                    setYear(newValue);
                }
            }}
            id="controllable-states-demo"
            options={years}
            sx={textBoxStyles}
            renderInput={(params) => <TextField {...params} label="Year" />}
        />
        <br />
        <br />
        <Autocomplete
            onChange={(event: any, newValue) => {
                if (newValue != null) {
                    setAge(`${newValue}`);
                }
            }}
            id="controllable-states-demo"
            options={ages}
            sx={textBoxStyles}
            renderInput={(params) => <TextField {...params} label="Age" />}
        />
        <br />
        <br />
        <Autocomplete
            onChange={(event: any, newValue: string | null) => {
                if (newValue != null) {
                    setGender(newValue);
                }
            }}
            id="controllable-states-demo"
            options={genders}
            sx={textBoxStyles}
            renderInput={(params) => <TextField {...params} label="Gender" />}
        />
        <br />
        <br />
        <Autocomplete
            multiple
            id="tags-outlined"
            options={interestsList}
            getOptionLabel={(option) => option}
            sx={textBoxStyles}
            onChange={(e, v) => { setInterests(v) }}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Interests"
                    placeholder="Add up to 7 interests"
                />
            )}
        />
        <br />
        <br />
        <Autocomplete
            onChange={(event: any, newValue: string | null) => {
                if (newValue != null) {
                    setPreference(newValue);
                }
            }}
            id="controllable-states-demo"
            options={genders.map((v) => v + "s")}
            sx={textBoxStyles}
            renderInput={(params) => <TextField {...params} label="I want to see..." />}
        />
        <br />
        <br />
        <TextField 
            label="Short Bio"
            multiline
            sx={textBoxStyles}
            onChange={(e) => { setBio(e.target.value) }}
        />
        <br />
        <br />
        <TextField 
            label="Phone Number"
            sx={textBoxStyles}
            onChange={(e) => { setPhoneNumber(e.target.value) }}
        />
        <br />
        <br />
        <Button 
            variant="outlined"
            onClick={async () => {await submit()}}
        >Sign up!</Button>
        <br />
        <br />
        <p>Already have an account? <Link to="/login">Login!</Link></p>
    </div>
  );
}

export default CreateAccount;
