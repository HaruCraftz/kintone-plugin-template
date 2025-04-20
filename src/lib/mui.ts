import { createTheme } from '@mui/material';

export const getMUITheme = () => {
  return createTheme({
    palette: {
      primary: {
        main: '#3498db',
      },
    },
  });
};
