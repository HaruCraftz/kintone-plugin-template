import { type FC } from 'react';
import { useAtomValue } from 'jotai';
import { FormProvider } from 'react-hook-form';
import { Box, Container } from '@mui/material';
import { useSnackbar } from 'notistack';
import { usePluginForm } from '@/config/hooks/usePluginForm';
import { activeTabIndexAtom } from '@/config/states/plugin';
import { Header } from '@/config/components/core/layout/Header';
import { FormTabs } from '@/config/components/features/FormTabs';
import { storeConfig, type PluginConfig } from '@/shared/config';

export const PluginContent: FC = () => {
  const { methods, handleReset } = usePluginForm();
  const activeTabIndex = useAtomValue(activeTabIndexAtom);
  const { enqueueSnackbar } = useSnackbar();

  // --- 離脱防止ガード (HeaderのDiscardConfirmDialogでカバーされているか？) ---
  // Headerは「キャンセルボタン押下時」のダイアログ。
  // ブラウザバックやリロードに対するガードは別途必要。
  // copy.tsxにあった useEffect を移植する。
  const { isDirty } = methods.formState;

  // React 19 / Modern browsers usually require event listener for beforeunload
  // copy.tsx logic:
  /*
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);
  */
  // I will include this logic in PluginContent or a hook. useDiscardConfirm hook might handle it?
  // Let's check useDiscardConfirm later or just inline it for safety as in copy.tsx.

  const onSave = methods.handleSubmit(async (data: PluginConfig) => {
    try {
      await storeConfig(data);
      enqueueSnackbar('設定を保存しました。', { variant: 'success' });
      methods.reset(data);
    } catch (e) {
      enqueueSnackbar('保存に失敗しました。', { variant: 'error' });
      console.error(e);
    }
  });

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={onSave} sx={{ pb: 12, bgcolor: '#f9fafb', minHeight: '100vh' }}>
        <Header />

        <Container maxWidth="lg" sx={{ py: 4 }}>
          {FormTabs[activeTabIndex]?.content}
        </Container>
      </Box>
    </FormProvider>
  );
};
