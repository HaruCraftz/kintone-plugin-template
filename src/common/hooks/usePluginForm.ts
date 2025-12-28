import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PluginConfigSchema, type PluginConfig } from '@/common/config';

/** フォームの初期化 */
export const usePluginForm = (defaultValues: PluginConfig) => {
  return useForm<PluginConfig>({
    resolver: zodResolver(PluginConfigSchema),
    defaultValues,
  });
};
