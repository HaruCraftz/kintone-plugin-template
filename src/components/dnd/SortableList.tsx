import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableItemWrapper, type SortableItemRenderProps } from './SortableItemWrapper';

interface SortableListProps<T> {
  /** ソート対象のアイテム配列 */
  items: T[];
  /** 並び替え完了時に呼び出されるコールバック (元のインデックス, 新しいインデックス) */
  onSortEnd: (oldIndex: number, newIndex: number) => void;
  /** 各アイテムをレンダリングする関数 */
  renderItem: (item: T, index: number, sortableProps: SortableItemRenderProps) => React.ReactNode;
  /** 各アイテムのユニークIDを取得する関数 (デフォルトは item.id または index) */
  getItemId?: (item: T, index: number) => string | number;
  /** リスト要素に適用するCSSクラス名 */
  className?: string;
}

/**
 * ドラッグ＆ドロップで並び替え可能なリストを提供する汎用コンポーネント。
 */
export function SortableList<T>({ items, onSortEnd, renderItem, getItemId, className }: SortableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        distance: 5,
      },
    })
  );

  // アイテムIDを解決する関数
  const resolveItemId = (item: T, index: number): string | number => {
    if (getItemId) {
      return getItemId(item, index);
    }
    // item がオブジェクトで 'id' プロパティを持つかチェック
    if (typeof item === 'object' && item !== null && 'id' in item) {
      const id = (item as { id: unknown }).id;
      if (typeof id === 'string' || typeof id === 'number') {
        return id;
      }
    }
    // id がない、またはgetItemIdが提供されない場合警告
    console.warn(
      'SortableList: Item does not have a valid "id" property and getItemId prop was not provided. Using index as key, which might cause issues if items are not stable.',
      item
    );
    return index;
  };

  // ドラッグ終了時の処理
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // active.idとover.idに対応する元の配列でのインデックスを見つける
      const oldIndex = items.findIndex((item, index) => resolveItemId(item, index) === active.id);
      const newIndex = items.findIndex((item, index) => resolveItemId(item, index) === over.id);

      // インデックスが見つかった場合のみコールバックを呼び出す
      if (oldIndex !== -1 && newIndex !== -1) {
        onSortEnd(oldIndex, newIndex);
      } else {
        console.error('SortableList: Could not find items for drag end event.', { active, over, items });
      }
    }
  };

  // SortableContextに渡すIDの配列
  const itemIds = items.map(resolveItemId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <div className={className}>
          {items.map((item, index) => {
            const id = resolveItemId(item, index);
            return (
              <SortableItemWrapper key={id} id={id}>
                {(sortableProps) => renderItem(item, index, sortableProps)}
              </SortableItemWrapper>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
