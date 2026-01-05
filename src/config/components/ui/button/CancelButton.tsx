import { type FC, useCallback, memo } from 'react';
import { Button, CircularProgress } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

type Props = {
  loading: boolean;
};

export const Component: FC<Props> = ({ loading }) => {
  const onBackButtonClick = useCallback(() => history.back(), []);

  return (
    <Button
      variant="contained"
      color="inherit"
      disabled={loading}
      onClick={onBackButtonClick}
      startIcon={loading ? <CircularProgress color="inherit" size={20} /> : <ExitToAppIcon />}
    >
      一覧へ戻る
    </Button>
  );
};

export default memo(Component);
