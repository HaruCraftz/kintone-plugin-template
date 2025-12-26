import { z } from 'zod';

/** Version 1 */
export const PluginConditionSchemaV1 = z.object({
  id: z.string().default(() => crypto.randomUUID()), // 各行に一意のIDを付与
  srcFieldCode: z.string().default(''),
  destFieldCode: z.string().default(''),
});

export const PluginConfigSchemaV1 = z.object({
  version: z.number().default(1),
  common: z.object({
    isUpdateOnSave: z.boolean().default(false), // 保存時に自動更新
  }),
  conditions: z.array(PluginConditionSchemaV1).default([]),
});

/** Version 2 */
// add other version schemas

/** Types */
type PluginConfigV1 = z.infer<typeof PluginConfigSchemaV1>;
export type AnyPluginConfig = PluginConfigV1; // | PluginConfigV2 | ...;

/** Latest */
export const LatestPluginConfigSchema = PluginConfigSchemaV1;
export type LatestPluginConfig = z.infer<typeof LatestPluginConfigSchema>;
