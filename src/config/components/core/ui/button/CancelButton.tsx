import { type FC, memo } from 'react';
import { Button, CircularProgress } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

type Props = {
  loading: boolean;
  onClick: () => void;
};

export const CancelButton: FC<Props> = memo(function CancelButton({ loading, onClick }) {
  return (
    <Button
      variant="contained"
      color="inherit"
      disabled={loading}
      startIcon={loading ? <CircularProgress color="inherit" size={20} /> : <ExitToAppIcon />}
      onClick={onClick}
    >
      キャンセル
    </Button>
  );
});
