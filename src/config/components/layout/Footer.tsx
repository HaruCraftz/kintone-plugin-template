import type { FC } from 'react';
import { Box, Button, Paper, Container } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useFormState } from 'react-hook-form';

type Props = {
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
};

export const Footer: FC<Props> = ({ onSave, onCancel, isSaving }) => {
  const { isDirty, isValid } = useFormState(); // 親のFormProviderから状態を取得

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        zIndex: 1100,
        borderRadius: 0,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="contained"
            onClick={onSave}
            loading={isSaving}
            disabled={!isDirty || !isValid} // 変更がない、またはエラーがある時は押せない
            startIcon={<SaveIcon />}
          >
            設定を保存
          </Button>
          <Button variant="outlined" onClick={onCancel} disabled={isSaving}>
            キャンセル
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};
