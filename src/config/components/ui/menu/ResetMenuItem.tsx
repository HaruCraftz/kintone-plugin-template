import { type FC, useState } from 'react';
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { RestartAlt } from '@mui/icons-material';

type Props = {
  onConfirm: () => void;
};

export const ResetMenuItem: FC<Props> = ({ onConfirm }) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={() => setOpen(true)}>
        <ListItemIcon>
          <RestartAlt fontSize="small" />
        </ListItemIcon>
        <ListItemText>設定をリセット</ListItemText>
      </MenuItem>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>設定のリセット</DialogTitle>
        <DialogContent>
          <DialogContentText>このプラグインの設定を初期状態に戻します。よろしいですか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleConfirm}>
            リセット
          </Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
