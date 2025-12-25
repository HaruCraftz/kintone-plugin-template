import { PluginConfigSchema, type PluginConfig } from './schema';
import { PLUGIN_ID } from '../constants/kintone';

/**
 * 保存: オブジェクトをJSON文字列に変換してkintoneに保存
 */
export const storeConfig = (config: PluginConfig): void => {
  const rawValues = Object.fromEntries(Object.entries(config).map(([key, value]) => [key, JSON.stringify(value)]));
  kintone.plugin.app.setConfig(rawValues);
};

/**
 * 復元: kintoneから取得し、Zodで検証・補完して返す
 */
export const restoreConfig = (): PluginConfig => {
  const raw = kintone.plugin.app.getConfig(PLUGIN_ID);

  if (!Object.keys(raw).length) {
    return PluginConfigSchema.parse({});
  }

  try {
    // string 以外（undefinedなど）を除外してパースする
    const entries = Object.entries(raw)
      .filter((item): item is [string, string] => typeof item[1] === 'string')
      .map(([key, value]) => [key, JSON.parse(value)]);

    const parsed = Object.fromEntries(entries);

    return PluginConfigSchema.parse(parsed);
  } catch (error) {
    console.error('[Plugin] 設定の復元に失敗しました。', error);
    return PluginConfigSchema.parse({});
  }
};
