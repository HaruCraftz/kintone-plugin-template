import { LATEST_VERSION, type AnyPluginConfig, type PluginConfig, LatestConfigSchema } from './schema';

export const migrateConfig = (rawConfig: AnyPluginConfig): PluginConfig => {
  const config = { ...rawConfig };

  // バージョン未定義（初期）の対応
  if (!config.version) {
    config.version = 1;
  }

  // バージョンごとの移行ロジック（将来用）
  // switch (config.version) {
  //   case 1:
  //     // version 1 から 2 への変換処理...
  // }

  // 最新スキーマでパースしてデフォルト値を補完
  return LatestConfigSchema.parse(config);
};
