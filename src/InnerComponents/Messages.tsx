
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function Messages() {
  const theme = useTheme();

  return (
    <div>
        <Typography paragraph>
          Messages
        </Typography>
    </div>
  );
}