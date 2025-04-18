import { detectGuestSpaceId } from './util';

export const PLUGIN_ID = kintone.$PLUGIN_ID;
export const LANGUAGE = kintone.getLoginUser()?.language;
export const GUEST_SPACE_ID = detectGuestSpaceId();
