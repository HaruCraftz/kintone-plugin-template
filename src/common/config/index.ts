import { PLUGIN_ID } from '../constants/kintone';
import { LatestConfigSchema, type PluginConfig } from './schema';
import { migrateConfig } from './migrations';

/**
 * 初期設定値の生成
 */
export const createDefaultConfig = (): PluginConfig => LatestConfigSchema.parse({});

/**
 * 設定の保存
 */
export const storeConfig = (config: PluginConfig, callback?: () => void): void => {
  const serialized = Object.entries(config).reduce<Record<string, string>>((acc, [key, value]) => {
    acc[key] = JSON.stringify(value);
    return acc;
  }, {});

  kintone.plugin.app.setConfig(serialized, callback);
};

/**
 * 設定の復元（移行処理を含む）
 */
export const restoreConfig = (): PluginConfig => {
  const rawConfig = kintone.plugin.app.getConfig(PLUGIN_ID);

  if (!rawConfig || Object.keys(rawConfig).length === 0) {
    return createDefaultConfig();
  }

  try {
    const parsed = Object.entries(rawConfig).reduce<any>((acc, [key, value]) => {
      acc[key] = JSON.parse(value);
      return acc;
    }, {});

    return migrateConfig(parsed);
  } catch (e) {
    console.error('[Config] Failed to restore config:', e);
    return createDefaultConfig();
  }
};

// schema で定義した型も再エクスポートしておくと便利
export * from './schema';
