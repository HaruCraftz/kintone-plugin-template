import { kintoneAPI } from './api';

declare global {
  namespace kintone {
    namespace events {
      // イベント名のリテラル型
      type KintoneEventTypes = keyof kintoneAPI.event.EventTypeMap<any>;

      // イベントオブジェクトの型
      type KintoneEvent<T extends KintoneEventTypes> = kintoneAPI.event.EventTypeMap<any>[T];

      // イベントハンドラの登録関数
      function on<T extends KintoneEventTypes>(type: T | T[], handler: (event: KintoneEvent<T>) => unknown): void;

      // フィールド変更イベント用
      function on(
        type: `app.record.create.change.${string}` | `app.record.edit.change.${string}`,
        handler: (event: any) => unknown
      ): void;

      // イベントハンドラの登録関数
      function off<T extends KintoneEventTypes>(type: T | T[], handler: (event: KintoneEvent<T>) => unknown): boolean;

      // フィールド変更イベント用
      function off(
        type: `app.record.create.change.${string}` | `app.record.edit.change.${string}`,
        handler: (event: any) => unknown
      ): boolean;
    }
  }
}
