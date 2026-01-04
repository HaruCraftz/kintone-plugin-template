import { type FC, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { Container, Box, Tabs, Tab, Alert } from '@mui/material';
import { Header } from './Header';
import { StickyFooter } from './StickyFooter';
import { FieldMappingSection } from '../sections/FieldMappingSection';
import { usePluginForm } from '@/config/hooks/usePluginForm'; // 前に定義したhook
import { storeConfig } from '@/common/config';

export const PluginLayout: FC = () => {
  const { methods, handleReset } = usePluginForm();
  const [activeTab, setActiveTab] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // 保存処理
  const onSave = methods.handleSubmit(async (data) => {
    setIsSaving(true);
    try {
      storeConfig(data);
      // ここで本来はトースト通知(Phase 6)
    } finally {
      setIsSaving(false);
    }
  });

  return (
    <FormProvider {...methods}>
      <Box sx={{ pb: 12, bgcolor: '#f9fafb', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Header onReset={handleReset} />

          {/* タブメニュー：リッチなUIの象徴 */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
              <Tab label="フィールドマッピング" />
              <Tab label="高度な設定" disabled />
            </Tabs>
          </Box>

          {/* コンテンツエリア */}
          {activeTab === 0 && (
            <Box>
              <Alert severity="info" sx={{ mb: 3 }}>
                データのコピー元とコピー先のフィールドを選択してください。
              </Alert>
              <FieldMappingSection />
            </Box>
          )}
        </Container>

        <StickyFooter onSave={onSave} onCancel={() => history.back()} isSaving={isSaving} />
      </Box>
    </FormProvider>
  );
};
