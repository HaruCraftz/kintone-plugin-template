import { PLUGIN_ID } from './global';

export interface PluginConfig {
  sourceField: string;
  targetField: string;
}

export const getPluginConfig = (): PluginConfig => {
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  return {
    sourceField: config.sourceField,
    targetField: config.targetField,
  };
};

export const setPluginConfig = (config: PluginConfig): void => {
  kintone.plugin.app.setConfig(config);
};
