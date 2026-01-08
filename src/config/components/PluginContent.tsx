import { type FC } from 'react';
import { useAtom } from 'jotai';
import { FormProvider } from 'react-hook-form';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { storeConfig, type PluginConfig } from '@/shared/config';
import { activeTabIndexAtom } from '@/config/states/plugin';
import { usePluginForm } from '@/config/hooks/usePluginForm';
import { Header } from '@/config/components/core/layout/Header';
import { Form } from './core/layout/Form';

export const PluginContent: FC = () => {
  const { methods, handleReset } = usePluginForm();
  const { enqueueSnackbar } = useSnackbar();
  const [activeTab, setActiveTab] = useAtom(activeTabIndexAtom);

  /** タブ変更 */
  const onTabChange = (index: number) => {
    setActiveTab(index);
  };

  /** 保存 */
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

  /** キャンセル */
  const onCancel = () => history.back();

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={onSave}>
        <Header activeTab={activeTab} onTabChange={onTabChange} onCancel={onCancel} />
        <Form />
      </Box>
    </FormProvider>
  );
};
