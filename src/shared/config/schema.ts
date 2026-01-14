import { z } from 'zod';

/** Version 1 */
export const PluginConditionSchemaV1 = z.object({
  id: z.string(), // 各行に一意のIDを付与
  srcFieldCode: z.string().min(1, { message: '選択必須です' }), // 参照先フィールドコード
  destFieldCode: z.string().min(1, { message: '選択必須です' }), // 更新先フィールドコード
});

export const PluginConfigSchemaV1 = z.object({
  version: z.literal(1),
  common: z.object({
    isUpdateOnSave: z.boolean(), // 保存時に自動更新
  }),
  conditions: z.array(PluginConditionSchemaV1),
});

type PluginConfigV1 = z.infer<typeof PluginConfigSchemaV1>;

/** Version 2 */
// add other version schemas

/** Latest */
export const LATEST_PLUGIN_VERSION = 1;
export const PluginConfigSchema = PluginConfigSchemaV1;

/** Types */
export type AnyPluginConfig = PluginConfigV1; // | PluginConfigV2 | ...;
export type PluginConfig = z.infer<typeof PluginConfigSchema>;
export type PluginCondition = PluginConfig['conditions'][number];

const TARGET_FIELDS: Array<keyof PluginCondition> = ['srcFieldCode', 'destFieldCode'];

/**
 * 動的な検証を含むスキーマを生成する
 * @param fieldCodes アプリに存在するフィールドコードのリスト
 */
export const createConfigSchema = (fieldCodes: string[]) => {
  const fieldCodeSet = new Set(fieldCodes);
  return PluginConfigSchema.superRefine(({ conditions }, ctx) => {
    conditions.forEach((condition, index) => {
      // 存在チェック
      TARGET_FIELDS.forEach((key) => {
        const value = condition[key]; // 設定情報
        if (value && !fieldCodeSet.has(value)) {
          ctx.addIssue({
            code: 'custom',
            message: '指定されたフィールドがアプリ内に見つかりません',
            path: ['conditions', index, key],
          });
        }
      });
    });
  });
};
