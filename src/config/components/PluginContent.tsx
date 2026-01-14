/* src/config/components/PluginContent.tsx */
import { type FC, useCallback } from 'react';
import { useAtom } from 'jotai';
import { FormProvider, useFormContext } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { activeTabIndexAtom } from '@/config/states/plugin';
import { usePluginForm } from '@/config/hooks/usePluginForm';
import { usePluginSubmit } from '@/config/hooks/usePluginSubmit';
import { type PluginConfig } from '@/shared/config';
import { Header } from '@/config/components/core/layout/Header';
import { Form } from './core/layout/Form';
import { FormTabs } from '@/config/components/features/FormTabs';

/**
 * 実際のフォーム内容とロジックを管理する内部コンポーネント
 */
const PluginContentForm: FC = () => {
  const { handleSubmit } = useFormContext<PluginConfig>();
  const [activeTab, setActiveTab] = useAtom(activeTabIndexAtom);

  /** プラグイン一覧へ戻る処理 */
  const handleNavigateBack = useCallback(() => history.back(), []);

  /** タブ変更ハンドラ */
  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  /** 送信処理の初期化 */
  const { onSubmit } = usePluginSubmit({
    successAction: (
      <Button
        type="button"
        color="inherit"
        size="small"
        variant="outlined"
        onClick={handleNavigateBack}
      >
        プラグイン一覧に戻る
      </Button>
    ),
  });

  /** フォーム送信ハンドラ */
  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
    >
      <Header
        tabs={FormTabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCancel={handleNavigateBack}
      />
      <Form tabs={FormTabs} />
    </Box>
  );
};

/**
 * プラグイン設定画面のメインコンテンツ
 * FormProvider を提供し、内部コンポーネントで RHF のコンテクストを利用可能にする
 */
export const PluginContent: FC = () => {
  const { methods } = usePluginForm();

  return (
    <FormProvider {...methods}>
      <PluginContentForm />
    </FormProvider>
  );
};
