import { type FC, memo, Suspense } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IconButton, Skeleton, Tooltip } from '@mui/material';
import { useAtomValue } from 'jotai';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { JotaiFieldSelect } from '@/components/jotai';
import { useArray } from '@/config/hooks/use-array';
import { getConditionPropertyAtom } from '@/config/states/plugin';
import { appSingleLineTextFieldsAtom, appDateFieldsAtom } from '@/config/states/kintone';

// ドラッグ可能な行コンポーネント
interface SortableFieldRowProps {
  id: number;
  field: { srcFieldCode: string; destFieldCode: string };
  updateItem: (params: { index: number; newItem: { srcFieldCode: string; destFieldCode: string } }) => void;
  deleteItem: (index: number) => void;
  addItem: (params: { newItem: { srcFieldCode: string; destFieldCode: string }; index?: number }) => void;
  isDeleteEnabled: boolean;
}

const SortableFieldRow: FC<SortableFieldRowProps> = ({
  id,
  field,
  updateItem,
  deleteItem,
  addItem,
  isDeleteEnabled,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='flex items-center gap-2 p-2 bg-white border border-transparent rounded hover:border-gray-200'
    >
      <div {...attributes} {...listeners} className='cursor-grab'>
        <DragIndicatorIcon fontSize='small' />
      </div>
      <JotaiFieldSelect
        label='生年月日フィールド'
        fieldPropertiesAtom={appDateFieldsAtom}
        fieldCode={field.srcFieldCode}
        onChange={(srcFieldCode) =>
          updateItem({
            index: id,
            newItem: {
              srcFieldCode,
              destFieldCode: field.destFieldCode || '',
            },
          })
        }
      />
      <JotaiFieldSelect
        label='年齢フィールド'
        fieldPropertiesAtom={appSingleLineTextFieldsAtom}
        fieldCode={field.destFieldCode}
        onChange={(destFieldCode) =>
          updateItem({
            index: id,
            newItem: {
              srcFieldCode: field.srcFieldCode || '',
              destFieldCode,
            },
          })
        }
      />
      <Tooltip title='フィールドを追加する'>
        <IconButton
          size='small'
          onClick={() =>
            addItem({
              newItem: { srcFieldCode: '', destFieldCode: '' },
              index: id + 1,
            })
          }
        >
          <AddIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      {isDeleteEnabled && (
        <Tooltip title='このフィールドを削除する'>
          <IconButton size='small' onClick={() => deleteItem(id)}>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

const Component: FC = () => {
  const fieldsAtom = getConditionPropertyAtom('fieldMapping');
  const fields = useAtomValue(fieldsAtom);
  const { addItem, deleteItem, updateItem } = useArray(fieldsAtom);

  // DnDのセンサー設定
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // ドラッグ終了時の処理
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = Number(active.id);
      const newIndex = Number(over.id);

      // フィールドの順序を変更
      const newFields = arrayMove([...fields], oldIndex, newIndex);

      // 新しい配列で更新
      newFields.forEach((field, index) => {
        updateItem({ index, newItem: field });
      });
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      {fields.length > 0 ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map((_, i) => i)} strategy={verticalListSortingStrategy}>
            {fields.map((field, i) => (
              <SortableFieldRow
                id={i}
                field={field}
                updateItem={updateItem}
                deleteItem={deleteItem}
                addItem={addItem}
                isDeleteEnabled={fields.length > 1}
              />
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        <div className='flex justify-center'>
          <IconButton onClick={() => addItem({ newItem: { srcFieldCode: '', destFieldCode: '' } })}>
            <AddIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

const Placeholder: FC = () => (
  <div className='flex flex-col gap-4'>
    {new Array(3).fill('').map((_, i) => (
      <div key={i} className='flex items-center gap-2 p-2'>
        <Skeleton variant='circular' width={24} height={24} />
        <Skeleton variant='rounded' width={200} height={56} />
        <Skeleton variant='rounded' width={200} height={56} />
        <Skeleton variant='circular' width={24} height={24} />
        <Skeleton variant='circular' width={24} height={24} />
      </div>
    ))}
  </div>
);

const Container: FC = () => (
  <Suspense fallback={<Placeholder />}>
    <Component />
  </Suspense>
);

export default memo(Container);
