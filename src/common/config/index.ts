import { LatestPluginConfigSchema, type LatestPluginConfig, type AnyPluginConfig } from './schema';
import { PLUGIN_ID } from '../constants/kintone';

/**
 * 初期化: デフォルトの設定を返す
 */
export const createConfig = (): LatestPluginConfig => {
  return LatestPluginConfigSchema.parse({});
};

/**
 * 保存: オブジェクトをJSON文字列に変換してkintoneに保存
 */
export const storeConfig = (config: LatestPluginConfig): void => {
  const rawValues = Object.fromEntries(Object.entries(config).map(([key, value]) => [key, JSON.stringify(value)]));
  kintone.plugin.app.setConfig(rawValues);
};

/**
 * 変換: 古い設定を新しい設定に変換
 */
const migrateConfig = (anyConfig: AnyPluginConfig): LatestPluginConfig => {
  const { version, ...other } = anyConfig;
  switch (version) {
    case undefined:
      return migrateConfig({ version: 1, ...other });
    case 1:
    default:
      return anyConfig;
  }
};

/**
 * 復元: kintoneから取得し、Zodで検証・補完して返す
 */
export const restoreConfig = (): LatestPluginConfig => {
  try {
    const raw = kintone.plugin.app.getConfig(PLUGIN_ID);

    // データが空なら初期値をパースして返す
    if (!Object.keys(raw).length) return createConfig();

    // パース処理
    const parsed = Object.fromEntries(
      Object.entries(raw)
        .filter((item): item is [string, string] => typeof item[1] === 'string')
        .map(([k, v]) => [k, JSON.parse(v)])
    );

    // 新しい設定に変換
    const migrated = migrateConfig(parsed as AnyPluginConfig);
    return LatestPluginConfigSchema.parse(migrated);
  } catch (error) {
    console.error('[Plugin] 設定の復元に失敗しました。', error);
    return createConfig();
  }
};
