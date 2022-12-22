
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function Search() {

  return (
    <div>
        
        <Stack spacing={2} direction="row">
          <TextField
            id="outlined-helperText"
            label="State"
            onChange={(e) => {
              // setYearChanged(true);
              // setYear(e.target.value);
            }}
          />
          <TextField
            id="outlined-helperText"
            label="School"
            onChange={(e) => {
              // setYearChanged(true);
              // setYear(e.target.value);
            }}
          />
          <TextField
            id="outlined-helperText"
            label="Interests"
            onChange={(e) => {
              // setYearChanged(true);
              // setYear(e.target.value);
            }}
          />
          <TextField
            id="outlined-helperText"
            label="Year"
            onChange={(e) => {
              // setYearChanged(true);
              // setYear(e.target.value);
            }}
          />
          <TextField
            id="outlined-helperText"
            label="Major"
            onChange={(e) => {
              // setYearChanged(true);
              // setYear(e.target.value);
            }}
          />
          <TextField
            id="outlined-helperText"
            label="Name"
            onChange={(e) => {
              // setYearChanged(true);
              // setYear(e.target.value);
            }}
          />
          
            <Button 
              variant="outlined"
              onClick={async () => {
                // await changeInfo(); 
              }}>Search</Button>
        </Stack>
        <br />
        <br />
    </div>
  );
}