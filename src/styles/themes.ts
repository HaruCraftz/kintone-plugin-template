import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db', // kintoneのブランドカラーに近い青
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontSize: 14, // kintoneの標準フォントサイズに合わせる
  },
});
