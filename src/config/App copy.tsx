import { type FC, Suspense } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { theme } from '@/styles/themes';
import { PluginErrorBoundary } from './components/PluginErrorBoundary';
import { LoaderWithLabel } from './components/LoaderWithLabel';
import { PluginForm } from './components/PluginForm';
import { Header } from './components/Header';

const App: FC = () => {
  return (
    <Suspense fallback={<LoaderWithLabel label="画面を準備しています..." />}>
      <JotaiProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline は MUI のスタイルを正常に機能させるためのリセット CSS です */}
          <CssBaseline />
          <PluginErrorBoundary>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              {/* 設定情報の読み込み完了まで Suspense で待機 */}
              <Suspense fallback={<LoaderWithLabel label="設定情報を読み込んでいます..." />}>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f7f9fa' }}>
                  <Header />
                  <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                    <PluginForm />
                  </Box>
                </Box>
              </Suspense>
            </SnackbarProvider>
          </PluginErrorBoundary>
        </ThemeProvider>
      </JotaiProvider>
    </Suspense>
  );
};

export default App;
