import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { pluginConfigAtom } from '@/config/states/plugin';
import { type PluginConfig, createConfigSchema } from '@/shared/config';
import { useAppFields } from '@/shared/hooks/useAppFields';

/** プラグイン設定フォームのカスタムフック */
export const usePluginForm = () => {
  const config = useAtomValue(pluginConfigAtom);
  const { fields } = useAppFields();

  // 現在のアプリにある全フィールドコードのリスト
  const fieldCodes = useMemo(() => fields.map((field) => field.code), [fields]);

  // フィールドコードのリストに基づいて動的なスキーマを生成
  const schema = useMemo(() => createConfigSchema(fieldCodes), [fieldCodes]);

  const methods = useForm<PluginConfig>({
    resolver: zodResolver(schema),
    defaultValues: config,
    mode: 'onChange',
  });

  const handleReset = () => methods.reset(config);

  return { methods, handleReset };
};
