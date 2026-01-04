import { type FC, useCallback, useState } from 'react';
import { RestartAlt } from '@mui/icons-material';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import { createConfig } from '@/lib/plugin';
import { pluginConfigAtom } from '@/config/states/plugin';

export const ResetMenuItem: FC<{ closeMenu: () => void }> = ({ closeMenu }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    closeMenu();
  };

  const resetConfig = useAtomCallback(
    useCallback(
      (_, set) => {
        set(pluginConfigAtom, createConfig());
        enqueueSnackbar('設定をリセットしました', { variant: 'error' });
        setOpenDialog(false);
        closeMenu();
      },
      [enqueueSnackbar, closeMenu]
    )
  );

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }} onClick={handleOpenDialog}>
        <ListItemIcon>
          <RestartAlt fontSize='small' />
        </ListItemIcon>
        <ListItemText>設定をリセット</ListItemText>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>設定のリセット</DialogTitle>
        <DialogContent>
          <DialogContentText>このプラグインの設定を初期状態に戻します。よろしいですか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' variant='contained' onClick={resetConfig}>
            リセット
          </Button>
          <Button color='inherit' variant='contained' onClick={handleCloseDialog}>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
