import type { FC } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

type Props = {
  onReset: () => void;
};

export const Header: FC<Props> = ({ onReset }) => (
  <Box sx={{ mb: 3 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        プラグインの設定
      </Typography>
      <Button variant="text" size="small" startIcon={<RestartAltIcon />} onClick={onReset} color="inherit">
        設定をリセット
      </Button>
    </Box>
    <Divider />
  </Box>
);
