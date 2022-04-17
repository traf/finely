import './../styles/main.scss';
import type { AppProps } from 'next/app';

// components
import { Box } from '@components/core';

// hooks
import { useThemeMode } from '@hooks/useThemeMode';

function MyApp({ Component, pageProps }: AppProps) {
  const { themeClassName } = useThemeMode();
  return (
    <Box className={themeClassName}>
      <Component {...pageProps} />
    </Box>
  );
}

export default MyApp;
