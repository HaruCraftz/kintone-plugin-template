import { type FC } from 'react';
import { Skeleton } from '@mui/material';

/**
 * FieldMappingEditorのローディング中に表示されるプレースホルダー。
 */
export const FieldMappingEditorPlaceholder: FC = () => (
  <div className='flex flex-col gap-1'>
    {' '}
    {/* FieldMappingEditorとgapを合わせる */}
    {/* プレースホルダー行をいくつか表示 */}
    {[...Array(3)].map((_, i) => (
      <div key={i} className='flex items-center gap-2 p-2'>
        {' '}
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
