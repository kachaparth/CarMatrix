import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AntdProvider } from './theme/AntdProvider';
import './index.css';
import App from './App';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AntdProvider>
        <App />
        <Toaster position="top-right" />
      </AntdProvider>
    </QueryClientProvider>
  </StrictMode>
);
