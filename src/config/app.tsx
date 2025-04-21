import { Provider } from 'jotai';
import { SnackbarProvider } from 'notistack';
import { FC, Suspense } from 'react';
import { LoaderWithLabel } from '@/components/loader/withLabel';
import { ThemeProvider } from '@/components/theme-provider';
import { PluginErrorBoundary } from '@/components/error-boundary';
import { store } from '@/lib/store';
import { PluginLayout, HeaderArea, ContentArea } from './model/layout';
import { PluginHeader } from './model/header';

const App: FC = () => (
  <Suspense fallback={<LoaderWithLabel label='画面の描画を待機しています' />}>
    <Provider store={store}>
      <ThemeProvider>
        <PluginErrorBoundary>
          <SnackbarProvider maxSnack={1}>
            <Suspense fallback={<LoaderWithLabel label='設定情報を取得しています' />}>
              <PluginLayout>
                <HeaderArea>
                  <PluginHeader />
                </HeaderArea>
                <ContentArea />
              </PluginLayout>
            </Suspense>
          </SnackbarProvider>
        </PluginErrorBoundary>
      </ThemeProvider>
    </Provider>
  </Suspense>
);

export default App;
