import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { pluginConfigAtom } from '@/config/states/plugin';
import { PluginConfigSchema, type PluginConfig } from '@/common/config';

/** プラグイン設定フォームのカスタムフック */
export const usePluginForm = () => {
  const config = useAtomValue(pluginConfigAtom);

  const methods = useForm<PluginConfig>({
    resolver: zodResolver(PluginConfigSchema),
    defaultValues: config,
    mode: 'onChange',
  });

  const handleReset = () => methods.reset(config);

  return { methods, handleReset };
};
