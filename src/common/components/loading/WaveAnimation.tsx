import { type FC } from 'react';
import { Box, keyframes } from '@mui/material';

const wave = keyframes`
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1); }
`;

export const WaveAnimation: FC = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 60 }}>
    {[0, 0.1, 0.2, 0.3].map((delay) => (
      <Box
        key={delay}
        sx={{
          width: 5,
          height: 40,
          background: 'linear-gradient(45deg, #3498db, #1abc9c)',
          margin: '0 5px',
          borderRadius: '2px',
          animation: `${wave} 1.2s infinite ease-in-out`,
          animationDelay: `${delay}s`,
        }}
      />
    ))}
  </Box>
);
