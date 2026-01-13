import { type FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export const DiscardConfirmDialog: FC<Props> = ({ open, onConfirm, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>設定の破棄</DialogTitle>
    <DialogContent>
      <DialogContentText>
        変更内容が保存されていません。このまま一覧画面に戻りますか？ （変更した内容は破棄されます）
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="error" variant="contained" onClick={onConfirm}>
        破棄して戻る
      </Button>
      <Button color="inherit" variant="contained" onClick={onClose}>
        キャンセル
      </Button>
    </DialogActions>
  </Dialog>
);
