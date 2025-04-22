import { FC, PropsWithChildren } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#3498db',
      },
    },
  });
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};
