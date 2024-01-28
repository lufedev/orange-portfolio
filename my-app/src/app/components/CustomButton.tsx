import { ThemeProvider } from '@mui/material/styles'
import { TypeButton } from '../lib/definiton'
import { ContainedTheme, TextTheme } from '../themes/Button'
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState } from 'react';

export default function CustomButton({
  theme,
  variant,
  color,
  size,
  disabled,
  name
}: TypeButton) {

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200); 
  };
  return (
    <ThemeProvider theme={theme ? ContainedTheme : TextTheme}>
    <LoadingButton
      variant={variant}
      color={color}
      size={size}
      onClick={handleClick}
      loading={loading}
      disabled={disabled}
    >
      {name}
    </LoadingButton>
  </ThemeProvider>
  )
}
