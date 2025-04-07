import React from 'react';
import { createRoot } from 'react-dom/client';
import Config from './Config.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Config />
  </React.StrictMode>
);
