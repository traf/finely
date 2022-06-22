import { infuraProvider } from 'wagmi/providers/infura';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { chain, defaultChains, createClient, configureChains } from 'wagmi';

const infuraId = process.env.INFURA_ID;

const { chains, provider } = configureChains(defaultChains, [infuraProvider({ infuraId })]);
const { connectors } = getDefaultWallets({
  chains,
  appName: 'Finely'
});

const wagmiClient = createClient({
  provider,
  connectors,
  autoConnect: true
});

export { chains, provider, connectors, wagmiClient };
