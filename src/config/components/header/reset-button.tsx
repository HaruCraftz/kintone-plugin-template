import { FC, memo, useCallback, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import { createConfig } from '@/lib/plugin';
import { pluginConfigAtom } from '../../states/plugin';

type Props = {
  reset: () => void;
};

const MuiComponent: FC<Props> = ({ reset }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onResetMenuClick = useCallback(() => {
    setOpen(true);
  }, []);

  const onClick = useCallback(() => {
    reset();
    setOpen(false);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>設定のリセット</DialogTitle>
        <DialogContent>
          <DialogContentText>
            このプラグインの設定を初期状態に戻します。よろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' variant='contained' onClick={onClick}>
            リセット
          </Button>
          <Button color='inherit' variant='contained' onClick={onClose}>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip title='プラグインの設定をリセット'>
        <IconButton onClick={onResetMenuClick}>
          <RestartAltIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

const Component: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const reset = useAtomCallback(
    useCallback(
      (_, set) => {
        set(pluginConfigAtom, createConfig());
        enqueueSnackbar('設定をリセットしました');
      },
      [enqueueSnackbar]
    )
  );

  return <MuiComponent reset={reset} />;
};

export default memo(Component);
