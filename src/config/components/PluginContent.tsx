import { type FC, useState, useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { Container, Box, Tabs, Tab, Alert, Snackbar, Alert as MuiAlert } from '@mui/material';
import { usePluginForm } from '@/config/hooks/usePluginForm';
import { storeConfig, type PluginConfig } from '@/common/config';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { FieldMappingSection } from './pages/FieldMappingSection';

export const PluginContent: FC = () => {
  const { methods, handleReset } = usePluginForm();
  const [activeTab, setActiveTab] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const { isDirty } = methods.formState;

  // --- 離脱防止ガード ---
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = ''; // ブラウザ標準の確認ダイアログを表示
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // --- 保存処理 ---
  const onSave = methods.handleSubmit(async (data: PluginConfig) => {
    setIsSaving(true);
    try {
      storeConfig(data); // 同期処理

      setToast({ open: true, message: '設定を保存しました。', severity: 'success' });

      // 保存に成功したら現在の値を初期値として再セットし、isDirtyをfalseにする
      methods.reset(data);

      // kintoneの設定画面を閉じる、またはリロードする場合は少し遅延させる
      // setTimeout(() => location.reload(), 1500);
    } catch (e) {
      setToast({ open: true, message: '保存に失敗しました。', severity: 'error' });
    } finally {
      setIsSaving(false);
    }
  });

  const handleCloseToast = () => setToast((prev) => ({ ...prev, open: false }));

  return (
    <FormProvider {...methods}>
      <Box sx={{ pb: 12, bgcolor: '#f9fafb', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Header onReset={handleReset} />

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
              <Tab label="フィールドマッピング" />
              <Tab label="高度な設定（準備中）" disabled />
            </Tabs>
          </Box>

          {activeTab === 0 && (
            <Box>
              {isDirty && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                  変更が未保存です。「設定を保存」ボタンを押して確定させてください。
                </Alert>
              )}
              <FieldMappingSection />
            </Box>
          )}
        </Container>

        <Footer
          onSave={onSave}
          onCancel={() => {
            if (isDirty && !confirm('変更が破棄されますがよろしいですか？')) return;
            history.back();
          }}
          isSaving={isSaving}
        />

        {/* トースト通知 */}
        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={handleCloseToast}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert onClose={handleCloseToast} severity={toast.severity} variant="filled">
            {toast.message}
          </MuiAlert>
        </Snackbar>
      </Box>
    </FormProvider>
  );
};
