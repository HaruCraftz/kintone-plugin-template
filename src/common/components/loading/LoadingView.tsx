import { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import { WaveAnimation } from './WaveAnimation';

type Props = {
  label?: string;
  minHeight?: string | number;
};

export const LoadingView: FC<Props> = ({ label = '読み込み中...', minHeight = '400px' }) => (
  <Box
    sx={{
      minHeight,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4, // 32px
    }}
  >
    <WaveAnimation />
    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'medium' }}>
      {label}
    </Typography>
  </Box>
);
