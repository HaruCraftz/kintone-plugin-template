import { type FC, memo } from 'react';
import { Button, CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useFormState } from 'react-hook-form';

type Props = {
  loading: boolean;
};

export const SaveButton: FC<Props> = memo(function SaveButton({ loading }) {
  const { isDirty, isSubmitting } = useFormState();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      startIcon={loading ? <CircularProgress color="inherit" size={18} /> : <SaveIcon />}
      disabled={loading || !isDirty || isSubmitting}
    >
      設定を保存
    </Button>
  );
});
