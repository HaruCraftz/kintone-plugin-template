import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// useSortableフックの結果の型を定義
type UseSortableReturn = ReturnType<typeof useSortable>;

export interface SortableItemRenderProps {
  attributes: UseSortableReturn['attributes']; // アクセシビリティ用の属性
  listeners: UseSortableReturn['listeners']; // ドラッグ操作に必要なリスナー
  setNodeRef: UseSortableReturn['setNodeRef']; // DOMノードをdndに関連付けるためのref
  style: React.CSSProperties;
  isDragging: boolean;
}

interface SortableItemWrapperProps {
  id: string | number;
  children: (props: SortableItemRenderProps) => React.ReactNode;
}

/**
 * useSortableフックをラップし、子コンポーネントにソート関連のプロパティを提供するコンポーネント。
 */
export function SortableItemWrapper({ id, children }: SortableItemWrapperProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // ドラッグ中は半透明に
  };

  return children({ attributes, listeners, setNodeRef, style, isDragging });
}
