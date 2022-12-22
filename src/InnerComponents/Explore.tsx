
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function Explore() {
  const theme = useTheme();

  return (
    <div>
        <Typography paragraph>
          Explore content: Probably want some sort of feed here
        </Typography>
    </div>
  );
}