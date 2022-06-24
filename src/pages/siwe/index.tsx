import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi';
import { ConnectButton as RainbowKitConnectButton } from '@rainbow-me/rainbowkit';

// libs
import { api } from '@lib/axios';

// helpers
import { createSignatureMessage } from '@helpers/createSignatureMessage';

// hooks
import { usePrevious } from '@root/src/hooks/usePrevious';

// components
import IconETH from '@components/IconETH';
import { Loader } from '@components/Loader';
import { Box, Button, H1, Paragraph } from '@components/core';

async function getPortalData(portalId: string) {
  const {
    data: { portal }
  } = await api({
    method: 'GET',
    url: `/portals/${portalId}`
  });

  return { portal };
}

async function fetchNonce() {
  const { data } = await api({
    method: 'GET',
    url: `/siwe/nonce`
  });

  return data.nonce;
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
  const { activeChain } = useNetwork();
  const { activeConnector } = useConnect();
  const { data: accountData } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const previousWalletAddress = usePrevious(accountData?.address);

  const portalId = router.query.portalId as string;
  const {
    data: portalData,
    error: portalDataError,
    isLoading: isLoadingPortalData
  } = useQuery(['portal', portalId], () => {
    return getPortalData(portalId);
  });

  const [error, setError] = useState<string>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  async function signIn() {
    try {
      const chainId = activeChain?.id;
      const address = accountData?.address;

      if (!address || !chainId || !activeConnector) return;

      setError(null);
      setIsConnecting(true);

      const nonce = await fetchNonce();
      const message = createSignatureMessage({
        nonce,
        address,
        chainId
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage()
      });

      const queryParams = new URLSearchParams({
        portalId,
        signature,
        message: message.toMessage()
      });
      router.push(`/api/siwe/verify?${queryParams}`);
    } catch (error) {
      setError(`We couldn't connect your wallet, please try again.`);
      setIsConnecting(false);
    }
  }

  useEffect(() => {
    const currentAddress = accountData?.address;
    if (currentAddress && currentAddress !== previousWalletAddress) {
      signIn();
    }
  }, [
    setError,
    setIsConnecting,
    activeConnector,
    activeChain?.id,
    signMessageAsync,
    accountData?.address,
    previousWalletAddress
  ]);

  useEffect(() => {
    if (!portalId) {
      setError('Invalid Portal');
      return;
    }

    setError(null);
  }, [portalId, setError]);

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
          {isLoadingPortalData && (
            <Box css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <H1 css={{ fontSize: '24px', marginBottom: 8 }}>Sign in with your wallet.</H1>
              <Box css={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Paragraph>Loading Portal details...</Paragraph>
                <Loader />
              </Box>
            </Box>
          )}

          {!isLoadingPortalData && portalDataError && (
            <Box
              css={{
                width: '100%',
                display: 'flex',
                textAlign: 'center',
                flexDirection: 'column'
              }}>
              <Paragraph>Portal not found.</Paragraph>
            </Box>
          )}

          {!isLoadingPortalData && !portalDataError && portalData && (
            <Box
              css={{
                width: '100%',
                display: 'flex',
                textAlign: 'center',
                flexDirection: 'column'
              }}>
              <H1 css={{ fontSize: '24px', marginBottom: 8 }}>Sign in with your wallet.</H1>
              <Paragraph css={{ marginBottom: 16 }}>
                {portalData.portal.name} is requesting to connect your wallet.{' '}
              </Paragraph>
              <ConnectButton onSignMessage={() => signIn()} isSigningIn={isConnecting} />
              {error && (
                <Paragraph css={{ mt: 16, fontSize: 14, color: '$error' }}>{error}</Paragraph>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
