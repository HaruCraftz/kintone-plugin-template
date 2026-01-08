import { type FC, useCallback } from 'react';
import { useAtom } from 'jotai';
import { FormProvider } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { activeTabIndexAtom } from '@/config/states/plugin';
import { usePluginForm } from '@/config/hooks/usePluginForm';
import { usePluginSubmit } from '@/config/hooks/usePluginSubmit';
import { Header } from '@/config/components/core/layout/Header';
import { Form } from './core/layout/Form';

export const PluginContent: FC = () => {
  const { methods } = usePluginForm();
  const [activeTab, setActiveTab] = useAtom(activeTabIndexAtom);

  /** タブ変更 */
  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  /** 保存後処理 */
  const handleBack = useCallback(() => history.back(), []);

  /** 送信処理 */
  const { onSubmit } = usePluginSubmit({
    reset: methods.reset,
    successAction: (
      <Button color="inherit" size="small" variant="outlined" onClick={handleBack}>
        プラグイン一覧に戻る
      </Button>
    ),
  });

  const handleSubmit = methods.handleSubmit(onSubmit);

  /** キャンセル処理 */
  const handleCancel = () => history.back();

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit}>
        <Header activeTab={activeTab} onTabChange={handleTabChange} onCancel={handleCancel} />
        <Form />
      </Box>
    </FormProvider>
  );
};
