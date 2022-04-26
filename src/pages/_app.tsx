import type { AppProps } from 'next/app';
import { Provider as WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from 'react-query';

// styles
import './../styles/main.scss';

const queryClient = new QueryClient();

// hooks
import { useThemeMode } from '@hooks/useThemeMode';

// libs
import { client as wagmiClient } from './../lib/wagmi';

function MyApp({ Component, pageProps }: AppProps) {
  const { themeClassName } = useThemeMode();
  console.log('themeClassName', themeClassName);
  return (
    <WagmiProvider client={wagmiClient}>
      <QueryClientProvider client={queryClient}>
        <div className={themeClassName}>
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
