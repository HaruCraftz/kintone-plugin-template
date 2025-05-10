// src/components/DraggableItem.tsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Paper, IconButton, Box } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DeleteIcon from '@mui/icons-material/Delete';

interface DraggableItemProps {
  id: string;
  children: React.ReactNode;
  onDelete: (id: string) => void;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ id, children, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative', // 必要に応じて
  };

  return (
    <Paper ref={setNodeRef} sx={{ mb: 2, p: 2, display: 'flex', alignItems: 'flex-start', gap: 2 }} style={style}>
      <Box
        {...attributes}
        {...listeners}
        sx={{ cursor: 'grab', p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <DragHandleIcon />
      </Box>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <IconButton onClick={() => onDelete(id)} aria-label='delete' size='small'>
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};
