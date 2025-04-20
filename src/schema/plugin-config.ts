import { z } from 'zod';

/** version 1 */
export const PluginConditionV1Schema = z.object({
  isUpdateOnSave: z.boolean(),
  fieldMapping: z.array(
    z.object({
      srcFieldCode: z.string(),
      destFieldCode: z.string(),
    })
  ),
});
export const PluginConfigV1Schema = z.object({
  version: z.literal(1),
  condition: PluginConditionV1Schema,
});

type PluginConfigV1 = z.infer<typeof PluginConfigV1Schema>;

/** version 2 */
// 2以降のバージョンを追加する場合は、ここにスキーマを追加してください

/** 最新のプラグイン設定 */
export const latestPluginConfigVersion = 1;
export const latestPluginConditionSchema = PluginConditionV1Schema;

/** 過去全てのバージョンを含むプラグインの設定情報 */
export type AnyPluginConfig = PluginConfigV1; // | PluginConfigV2 | ...;

/** プラグインがアプリ単位で保存する設定情報 */
export type PluginConfig = PluginConfigV1;

/** プラグインの詳細設定 */
export type PluginCondition = PluginConfig['condition'];
