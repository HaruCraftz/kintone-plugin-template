import { z } from 'zod';

export const FieldMappingSchema = z.object({
  srcFieldCode: z.string().default(''),
  destFieldCode: z.string().default(''),
});

/** Version 1 */
export const PluginConfigV1Schema = z.object({
  version: z.literal(1).default(1),
  condition: z
    .object({
      isUpdateOnSave: z.boolean().default(false),
      fieldMapping: z.array(FieldMappingSchema).default([{}]),
    })
    .default({}),
});

export type PluginConfigV1 = z.infer<typeof PluginConfigV1Schema>;

/** 最新バージョンの定義 */
export const LATEST_VERSION = 1;
export const LatestConfigSchema = PluginConfigV1Schema;

export type PluginConfig = z.infer<typeof LatestConfigSchema>;
export type PluginCondition = PluginConfig['condition'];
export type AnyPluginConfig = PluginConfigV1; // 将来的に V2 | V3 を追加
