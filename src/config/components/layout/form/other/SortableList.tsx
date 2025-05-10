// SortableList.tsx
import React from 'react';
import { DndContext, DragEndEvent, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { List, IconButton, Button, Box, Paper } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export interface SortableListProps<T extends { id: string }> {
  /** 現在のアイテム配列 */
  items: T[];
  /** アイテム配列が変更されたときに呼び出される(on add/remove/sort) */
  onChange: (items: T[]) => void;
  /** アイテム内を自由に描画するためのレンダープロップス */
  renderItem: (item: T, index: number, onItemChange: (newItem: T) => void) => React.ReactNode;
  /** 新規アイテムを生成する関数 */
  createNewItem: () => T;
}

export function SortableList<T extends { id: string }>(props: SortableListProps<T>) {
  const { items, onChange, renderItem, createNewItem } = props;

  // dnd-kit のセンサー設定
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        distance: 5,
      },
    })
  );

  // ドラッグ終了時の順序入れ替え
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      onChange(newItems);
    }
  };

  // アイテムの追加
  const handleAdd = () => {
    onChange([...items, createNewItem()]);
  };

  // アイテムの削除
  const handleRemove = (id: string) => {
    onChange(items.filter((i) => i.id !== id));
  };

  return (
    <Box>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <List>
            {items.map((item, index) => (
              <SortableItem
                key={item.id}
                item={item}
                index={index}
                onItemChange={(newItem) => {
                  const newItems = [...items];
                  newItems[index] = newItem;
                  onChange(newItems);
                }}
                onRemove={() => handleRemove(item.id)}
                renderItem={renderItem}
              />
            ))}
          </List>
        </SortableContext>
      </DndContext>
      <Button variant='outlined' startIcon={<AddIcon />} onClick={handleAdd} sx={{ mt: 2 }}>
        アイテムを追加
      </Button>
    </Box>
  );
}

interface SortableItemProps<T extends { id: string }> {
  item: T;
  index: number;
  onItemChange: (newItem: T) => void;
  onRemove: () => void;
  renderItem: (item: T, index: number, onItemChange: (newItem: T) => void) => React.ReactNode;
}

function SortableItem<T extends { id: string }>(props: SortableItemProps<T>) {
  const { item, index, onItemChange, onRemove, renderItem } = props;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // ドラッグ中は半透明に
    marginBottom: 8,
  };

  return (
    <Paper ref={setNodeRef} style={style} variant='outlined' sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
      <IconButton {...attributes} {...listeners}>
        <DragIndicatorIcon />
      </IconButton>
      <Box sx={{ flexGrow: 1 }}>{renderItem(item, index, onItemChange)}</Box>
      <IconButton onClick={onRemove}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
}
