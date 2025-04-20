import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { getMUITheme } from '../lib/mui';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <MUIThemeProvider theme={getMUITheme()}>{children}</MUIThemeProvider>
);
