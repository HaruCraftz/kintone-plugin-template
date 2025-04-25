import { Provider } from 'jotai';
import { SnackbarProvider } from 'notistack';
import { FC, Suspense } from 'react';
import { Box } from '@mui/material';
import { LoaderWithLabel } from '@/components/loader/withLabel';
import { ThemeProvider } from '@/components/ThemeProvider';
import { PluginErrorBoundary } from '@/components/ErrorBoundary';
import { store } from '@/lib/store';
import { PluginLayout } from './model/layout';
import { PluginHeader } from './model/header';
import { PluginForm } from './model/form';

const App: FC = () => (
  <Suspense fallback={<LoaderWithLabel label='画面の描画を待機しています' />}>
    {/* Provider が jotai atom の状態をコンポーネントツリー全体で共有可能にする */}
    <Provider store={store}>
      <ThemeProvider>
        <PluginErrorBoundary>
          <SnackbarProvider maxSnack={1}>
            <Suspense fallback={<LoaderWithLabel label='設定情報を取得しています' />}>
              <PluginLayout>
                <Box sx={{ width: '100%' }}>
                  <PluginHeader />
                  <PluginForm />
                </Box>
              </PluginLayout>
            </Suspense>
          </SnackbarProvider>
        </PluginErrorBoundary>
      </ThemeProvider>
    </Provider>
  </Suspense>
);

export default App;
