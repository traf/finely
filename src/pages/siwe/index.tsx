import { SiweMessage } from 'siwe';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useNetwork, useSignMessage } from 'wagmi';
import { Box, Button, H1, Paragraph, Text } from '@root/src/components/core';
import { ConnectButton as RainbowKitConnectButton } from '@rainbow-me/rainbowkit';

// libs
import { api } from '@lib/axios';

// helpers
import { createSignatureMessage } from '@helpers/createSignatureMessage';

// hooks
import { usePrevious } from '@root/src/hooks/usePrevious';

// components
import IconETH from '@root/src/components/IconETH';

async function verifyMessage({ message, signature }: { message: SiweMessage; signature: string }) {
  const {
    data: { code, walletAddress }
  } = await api({
    method: 'POST',
    url: `/siwe/verify`,
    data: { message, signature }
  });

  return { code, walletAddress };
}

async function fetchNonce() {
  const { data } = await api({
    method: 'GET',
    url: `/siwe/nonce`
  });

  return data.nonce;
}

async function fetchWallet() {
  const { data } = await api({
    method: 'GET',
    url: `/siwe/me`
  });

  return data.walletAddress;
}

export function ConnectButton({
  onSignMessage,
  isSigningIn
}: {
  onSignMessage: () => void;
  isSigningIn: boolean;
}) {
  return (
    <RainbowKitConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        return (
          <Box
            {...(!mounted && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none'
              }
            })}>
            {(() => {
              function handleConnect() {
                if (!account || !mounted || !chain) {
                  openConnectModal();
                  return;
                }

                onSignMessage();
              }

              if (isSigningIn) {
                return (
                  <Button css={{ width: '100%' }} color="secondary" onClick={handleConnect}>
                    Signing in...
                  </Button>
                );
              }

              if (chain?.unsupported) {
                return (
                  <Button css={{ width: '100%' }} color="secondary" onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }

              return (
                <Button css={{ width: '100%' }} color="secondary" onClick={handleConnect}>
                  Connect
                  <IconETH />
                </Button>
              );
            })()}
          </Box>
        );
      }}
    </RainbowKitConnectButton.Custom>
  );
}

export default function SignInWithWallet() {
  const router = useRouter();
  const { redirectUri, clientId } = router.query;
  const { activeChain } = useNetwork();
  const { activeConnector } = useConnect();
  const { data: accountData } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const previousWalletAddress = usePrevious(accountData?.address);

  const [error, setError] = useState<string>(null);
  const [authState, setAuthState] = useState({
    code: null,
    error: null,
    address: null,
    loading: false
  });

  async function signIn() {
    try {
      const chainId = activeChain?.id;
      const address = accountData?.address;

      if (!address || !chainId || !activeConnector) return;

      setAuthState((x) => ({ ...x, error: null, loading: true }));

      const nonce = await fetchNonce();
      const message = createSignatureMessage({
        nonce,
        address,
        chainId
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage()
      });

      const { code, walletAddress } = await verifyMessage({ message, signature });
      setAuthState((x) => ({ ...x, address: walletAddress, code, loading: false }));
    } catch (error) {
      setAuthState((x) => ({ ...x, error, loading: false }));
    }
  }

  useEffect(() => {
    const currentAddress = accountData?.address;
    if (currentAddress && currentAddress !== previousWalletAddress) {
      signIn();
    }
  }, [
    setAuthState,
    activeConnector,
    activeChain?.id,
    signMessageAsync,
    accountData?.address,
    previousWalletAddress
  ]);

  useEffect(() => {
    if (authState.error) {
      console.log('Redirect!');
    }
  }, [authState.error]);

  useEffect(() => {
    if (authState?.code) {
      router.push(`${redirectUri}?code=${authState.code}`);
    }
  }, [authState?.code]);

  useEffect(() => {
    if (!redirectUri || !clientId) {
      setError('Invalid redirect URI or client ID');
      return;
    }

    setError(null);
  }, [redirectUri, clientId, setError]);

  return (
    <Box
      css={{
        width: '100%',
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'stretch',
        backgroundColor: '$black'
      }}>
      <Box css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Box
          css={{
            padding: 24,
            width: '100%',
            borderRadius: '$md',
            border: '1px solid $border',
            '@md': { maxWidth: '400px' }
          }}>
          {error ? (
            <Box
              css={{
                width: '100%',
                display: 'flex',
                textAlign: 'center',
                flexDirection: 'column'
              }}>
              <Paragraph>{error}</Paragraph>
            </Box>
          ) : (
            <Box
              css={{
                width: '100%',
                display: 'flex',
                textAlign: 'center',
                flexDirection: 'column'
              }}>
              <H1 css={{ fontSize: '24px', marginBottom: 8 }}>Sign in with your wallet.</H1>
              <Paragraph css={{ marginBottom: 16 }}>
                {clientId} is requesting to connect your wallet.{' '}
              </Paragraph>
              <ConnectButton onSignMessage={() => signIn()} isSigningIn={authState?.loading} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
