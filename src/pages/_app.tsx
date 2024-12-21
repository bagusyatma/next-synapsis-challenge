import { darkTheme, lightTheme } from '@/theme/config';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.css';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

export default function App({ Component, pageProps, router }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ThemedApp Component={Component} pageProps={pageProps} router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function ThemedApp({ Component, pageProps, router }: AppProps) {
  const { isDarkMode } = useTheme();

  return (
    <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
