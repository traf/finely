import type { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit';

// styles
// import './../styles/main.scss';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

// hooks
import { useThemeMode } from '@hooks/useThemeMode';

// libs
import { wagmiClient, chains } from './../lib/wagmi';

function MyApp({ Component, pageProps }: AppProps) {
  const { themeClassName } = useThemeMode();
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={midnightTheme()}>
        <QueryClientProvider client={queryClient}>
          <div className={themeClassName}>
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
