import { z } from 'zod';

export const FieldMappingSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()), // 各行に一意のIDを付与
  srcFieldCode: z.string().default(''),
  destFieldCode: z.string().default(''),
});

// 設定全体の定義
export const PluginConfigSchema = z.object({
  version: z.number().default(1),
  isUpdateOnSave: z.boolean().default(false),
  fieldMappings: z.array(FieldMappingSchema).default([]),
});

export type PluginConfig = z.infer<typeof PluginConfigSchema>;
export type FieldMapping = z.infer<typeof FieldMappingSchema>;
