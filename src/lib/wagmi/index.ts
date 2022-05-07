import { providers } from 'ethers';
import { chain, defaultChains, createClient } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

// API key for Ethereum node
// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
const infuraId = process.env.INFURA_ID;

// Chains for connectors to support
const chains = defaultChains;

type Connector = InjectedConnector | WalletConnectConnector | CoinbaseWalletConnector;

export const client = createClient({
  autoConnect: true,
  connectors: getConnectors,
  provider: (config) => new providers.InfuraProvider(config.chainId, infuraId)
});

// Set up connectors
function getConnectors({ chainId }: { chainId?: number }): Connector[] {
  const rpcUrl = chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true }
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true
      }
    }),
    new CoinbaseWalletConnector({
      options: {
        appName: 'My wagmi app',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`
      }
    })
  ];
}
