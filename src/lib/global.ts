import { detectGuestSpaceId } from '@/lib/kintone';

export const PLUGIN_ID = kintone.$PLUGIN_ID;
export const GUEST_SPACE_ID = detectGuestSpaceId() ?? undefined;

export const ENV = (process?.env?.NODE_ENV ?? 'production') as 'production' | 'development';
export const isProd = ENV === 'production';
