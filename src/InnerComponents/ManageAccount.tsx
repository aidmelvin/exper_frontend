
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

import {
  BASE_URL,
  FETCH_ALL_USER_INFORMATION
} from "../constants/URLs";

import { setProfileInformation } from '../logic/manageAccount';

import { 
  OPERATION_SUCCESS,
  TEMPORARY_FILLER
} from '../constants/Constants';

import { schoolList } from '../data/schools';
import { interestsList } from '../data/interests';
import { years } from '../data/years';
import { ages } from '../data/ages';
import { genders } from '../data/genders';

import { textBoxStyles } from '../Setup/styles';


export default function ManageAccount() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>(TEMPORARY_FILLER);
  const [firstNameChanged, setFirstNameChanged] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string>(TEMPORARY_FILLER);
  const [lastNameChanged, setLastNameChanged] = useState<boolean>(false);

  const [email, setEmail] = useState<string>(TEMPORARY_FILLER);
  const [emailChanged, setEmailChanged] = useState<boolean>();
  const [phoneNumber, setPhoneNumber] = useState<string>(TEMPORARY_FILLER);
  const [phoneNumberChanged, setPhoneNumberChanged] = useState<boolean>(false);

  const [university, setUniversity] = useState<string>(TEMPORARY_FILLER);
  const [universityChanged, setUniversityChanged] = useState<boolean>(false);
  
  const [gender, setGender] = useState<string>(TEMPORARY_FILLER);
  const [genderChanged, setGenderChanged] = useState<boolean>(false);
  const [preference, setPreference] = useState<string>(TEMPORARY_FILLER);
  const [preferenceChanged, setPreferenceChanged] = useState<boolean>(false);
  const [year, setYear] = useState<string>(TEMPORARY_FILLER);
  const [yearChanged, setYearChanged] = useState<boolean>(false);
  const [age, setAge] = useState<string>(TEMPORARY_FILLER);
  const [ageChanged, setAgeChanged] = useState<boolean>(false);
  
  const [bio, setBio] = useState<string>(TEMPORARY_FILLER);
  const [bioChanged, setBioChanged] = useState<boolean>(false);

  const [interests, setInterests] = useState<Array<string>>([`${TEMPORARY_FILLER}`]);
  const [interestsChanged, setInterestsChanged] = useState<boolean>();

  //TODO: create a set new password thing

  useEffect(() => {
    // fetch all user data here
    fetch(`${BASE_URL}${FETCH_ALL_USER_INFORMATION}`, {
      credentials: "include", // causes it to send cookies
      mode: "cors"
    })
    .then((res) => res.json())
    .then((data) => {
      setFirstName(data['first_name']);
      setLastName(data['last_name']);
      
      setEmail(data["university_email"]);
      setPhoneNumber(data["phone_number"]);

      setUniversity(data["university"]);

      setGender(data["gender"]);
      setPreference(data["preference"]);
      setYear(data["year"]);
      setAge(`${data['age']}`);

      setBio(data["short_bio"]);

      setInterests(data['interests']);

    });
  }, []);

  const changeInfo = async () => {
    // send all data to server to update personal information
    const response: string = await setProfileInformation(firstName, lastName, email, phoneNumber,
    university, gender, year, bio, preference, age, interests);

    if (response === OPERATION_SUCCESS) {
      alert("Your data has been changed successfully");
      setFirstNameChanged(false);
      setLastNameChanged(false);
      setPhoneNumberChanged(false);
      setUniversityChanged(false);
      setGenderChanged(false);
      setPreferenceChanged(false);
      setYearChanged(false);
      setAgeChanged(false);
      setBioChanged(false);

      setInterestsChanged(false);

      if (emailChanged) {
        setEmailChanged(false);
        alert("Since your email was changed, you will need to be logged out.");
        navigate("/login");
        
      }
    } else {
      alert("Your data could not be changed. Please try again.");
    }

  }

  return (
    <div>
        <Typography paragraph>
          Your name
        </Typography>

        <Stack spacing={2} direction="row">
          {(firstName !== TEMPORARY_FILLER) && <TextField
            id="outlined-helperText"
            label="First Name"
            defaultValue={firstName}
            sx={textBoxStyles}
            onChange={(e) => {
              setFirstNameChanged(true);
              setFirstName(e.target.value);
            }}
          />}
          { firstNameChanged && 
            <Button 
              variant="outlined"
              onClick={async () => {
                await changeInfo(); 
              }}>Save</Button>}
        </Stack>
        <br />
        <br />
        <Stack spacing={2} direction="row">
        {(lastName !== TEMPORARY_FILLER) && <TextField
          id="outlined-helperText"
          label="Last Name"
          defaultValue={lastName}
          sx={textBoxStyles}
          onChange={(e) => {
            setLastNameChanged(true);
            setLastName(e.target.value);
          }}
        />}
        { lastNameChanged && 
            <Button 
              variant="outlined"
              onClick={async () => {
                await changeInfo(); 
              }}>Save</Button>}
        </Stack>
        
        <br />
        <br />
        <br />
        <Typography paragraph>
          Contact information
        </Typography>

        <Stack spacing={2} direction="row">
          {(email !== TEMPORARY_FILLER) && <TextField
            id="outlined-helperText"
            label="University Email"
            defaultValue={email}
            sx={textBoxStyles}
            onChange={(e) => {
              setEmailChanged(true);
              setEmail(e.target.value);
            }}
          />}
          { emailChanged && 
            <Button 
              variant="outlined"
              onClick={async () => {
                await changeInfo(); 
              }}>Save</Button>}
        </Stack>
        <br />
        <br />
        <Stack spacing={2} direction="row">
          {(phoneNumber !== TEMPORARY_FILLER) && <TextField
            id="outlined-helperText"
            label="Phone Number"
            defaultValue={phoneNumber}
            sx={textBoxStyles}
            onChange={(e) => {
              setPhoneNumberChanged(true);
              setPhoneNumber(e.target.value);
            }}
          />}
          { phoneNumberChanged && 
            <Button 
              variant="outlined"
              onClick={async () => {
                await changeInfo(); 
              }}>Save</Button>}
        </Stack>

        <br />
        <br />
        <br />
        <Typography paragraph>
          Your school
        </Typography>

        <Stack spacing={2} direction="row">
          {
            (university !== TEMPORARY_FILLER) && 
            <Autocomplete
                id="grouped-demo"
                value={{
                  title: `${university}`,
                  location: schoolList.filter((e) => e.title === university)[0].location
                }}
                options={schoolList.sort((a, b) => -b.location.localeCompare(a.location))}
                isOptionEqualToValue={(option, value) => option.title === value.title && option.location === value.location}
                groupBy={(option) => option.location}
                getOptionLabel={(option) => option.title}
                sx={textBoxStyles}
                onChange={(e, v) => {
                  if (v != null) {
                    setUniversity(v.title);
                    setUniversityChanged(true);
                  }
                }}
                renderInput={(params) => <TextField {...params} label="University" />}
            />
            }
          { universityChanged && 
            <Button 
              variant="outlined"
              onClick={async () => {
                await changeInfo(); 
              }}>Save</Button>}
        </Stack>

        <br />
        <br />
        <br />
        <Typography paragraph>
          Personal information
        </Typography>

        <Stack spacing={2} direction="row">
          {(interests[0] !== TEMPORARY_FILLER) && <Autocomplete
            multiple
            id="tags-outlined"
            options={interestsList}
            value={interests}
            getOptionLabel={(option) => option}
            sx={textBoxStyles}
            onChange={(e, v) => { 
              setInterests(v);
              setInterestsChanged(true);
            }}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Interests"
                    placeholder="Add up to 7 interests"
                />
            )}
        />}
          { interestsChanged && 
            <Button 
              variant="outlined"
              onClick={async () => {
                await changeInfo(); 
              }}>Save</Button>}
        </Stack>

        <br />
        <br />

        <Stack spacing={2} direction="row">
          {(gender !== TEMPORARY_FILLER) && <Autocomplete
            onChange={(event: any, newValue: string | null) => {
                if (newValue != null) {
                    setGender(newValue);
                    setGenderChanged(true);
                }
            }}
            id="controllable-states-demo"
            value={gender}
            options={genders}
            sx={textBoxStyles}
            renderInput={(params) => <TextField {...params} label="Gender" />}
        />}
          { genderChanged && 
            <Button 
              variant="outlined"
              onClick={async () => {
                await changeInfo(); 
              }}>Save</Button>}
        </Stack>
        <br />
        <br />

        <Stack spacing={2} direction="row">
          {(preference !== TEMPORARY_FILLER) && <Autocomplete
            onChange={(event: any, newValue: string | null) => {
                if (newValue != null) {
                    setPreference(newValue);
                    setPreferenceChanged(true);
                }
            }}
            id="controllable-states-demo"
            options={genders.map((v) => v + "s")}
            value={preference}
            sx={textBoxStyles}
            renderInput={(params) => <TextField {...params} label="I want to see..." />}
        />}
          { preferenceChanged && 
            <Button 
              variant="outlined"
              onClick={async () => {
                await changeInfo(); 
              }}>Save</Button>}
        </Stack>
        <br />
        <br />

        <Stack spacing={2} direction="row">
          {(year !== TEMPORARY_FILLER) && <Autocomplete
            onChange={(event: any, newValue: string | null) => {
                if (newValue != null) {
                    setYear(newValue);
                    setYearChanged(true);
                }
            }}
            id="controllable-states-demo"
            options={years}
            value={year}
            sx={textBoxStyles}
            renderInput={(params) => <TextField {...params} label="Year" />}
        />}
          { yearChanged && 
            <Button 
              variant="outlined"
              onClick={async () => {
                await changeInfo(); 
              }}>Save</Button>}
        </Stack>
        <br />
        <br />
        <Stack spacing={2} direction="row">
          {(age !== TEMPORARY_FILLER) && <Autocomplete
            onChange={(event: any, newValue) => {
                if (newValue != null) {
                    setAge(`${newValue}`);
                    setAgeChanged(true);
                }
            }}
            id="controllable-states-demo"
            options={ages}
            value={age}
            sx={textBoxStyles}
            renderInput={(params) => <TextField {...params} label="Age" />}
        />}
          { ageChanged && 
            <Button 
              variant="outlined"
              onClick={async () => {
                await changeInfo(); 
              }}>Save</Button>}
        </Stack>
        <br />
        <br />
        <Stack spacing={2} direction="row">
          {(bio !== TEMPORARY_FILLER) && <TextField
            id="outlined-helperText"
            label="Short bio"
            defaultValue={bio}
            sx={textBoxStyles}
            onChange={(e) => {
              setBioChanged(true);
              setBio(e.target.value);
            }}
          />}
          { bioChanged && 
            <Button 
              variant="outlined"
              onClick={async () => {
                await changeInfo(); 
              }}>Save</Button>}
        </Stack>
    </div>
  );
}