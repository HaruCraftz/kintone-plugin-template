import { type FC, Suspense } from 'react';
import { Skeleton } from '@mui/material';
import { FieldMappingEditor } from './FieldMappingEditor';

/**
 *  Suspenseによる遅延ロードとプレースホルダー表示
 */
export const FieldMappingEditorPlaceholder: FC = () => (
  <div className='flex flex-col gap-1'>
    {/* FieldMappingEditorとgapを合わせる */}
    {[...Array(3)].map((_, i) => (
      <div key={i} className='flex items-center gap-2 p-2'>
        {/* SortableFieldRowとスタイルを合わせる */}
        {/* ドラッグハンドル */}
        <Skeleton variant='circular' width={24} height={24} sx={{ flexShrink: 0 }} />
        {/* フィールド選択1 */}
        <Skeleton variant='rounded' width={'40%'} height={56} />
        {/* フィールド選択2 */}
        <Skeleton variant='rounded' width={'40%'} height={56} />
        {/* 追加ボタン */}
        <Skeleton variant='circular' width={32} height={32} sx={{ flexShrink: 0 }} />
        {/* 削除ボタン */}
        <Skeleton variant='circular' width={32} height={32} sx={{ flexShrink: 0 }} />
      </div>
    ))}
  </div>
);

const FieldMappingEditorContainer: FC = () => (
  <Suspense fallback={<FieldMappingEditorPlaceholder />}>
    <FieldMappingEditor />
  </Suspense>
);

export default FieldMappingEditorContainer;
