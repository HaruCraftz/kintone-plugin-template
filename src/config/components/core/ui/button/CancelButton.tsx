import { type FC, memo } from 'react';
import { Button, CircularProgress } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAtomValue } from 'jotai';
import { loadingAtom } from '@/config/states/plugin';

type Props = {
  onClick: () => void;
};

export const CancelButton: FC<Props> = memo(function CancelButton({ onClick }) {
  const loading = useAtomValue(loadingAtom);

  return (
    <Button
      variant='contained'
      color='inherit'
      disabled={loading}
      startIcon={loading ? <CircularProgress color='inherit' size={20} /> : <ExitToAppIcon />}
      onClick={onClick}
    >
      キャンセル
    </Button>
  );
});
