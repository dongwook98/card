import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Global } from '@emotion/react';
import globalStyles from './styles/globalStyles.ts';

import App from './App.tsx';
import { AlertContextProvider } from '@contexts/AlertContext.tsx';

const queryClient = new QueryClient({
  defaultOptions: {},
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Emotion 글로벌 스타일 적용 */}
    <Global styles={globalStyles} />
    <QueryClientProvider client={queryClient}>
      <AlertContextProvider>
        <App />
      </AlertContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
