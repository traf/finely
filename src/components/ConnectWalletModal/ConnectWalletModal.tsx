import { useEffect, useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { Connector, useConnect, useEnsName } from 'wagmi';

import { styled, keyframes } from '@root/stitches.config';

// icons
import XIcon from '@heroicons/react/outline/XIcon';
import LogoutIcon from '@heroicons/react/outline/LogoutIcon';
import DuplicateIcon from '@heroicons/react/outline/DuplicateIcon';

// helpers
import { truncateAddress } from '@root/src/helpers/truncateAddress';

// components
import { BaseButton, Box } from '@components/core';
import { useUserContext } from '@root/src/context/UserContext';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
});

const StyledOverlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, .5)',
  backdropFilter: 'blur(3px)',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`
  }
});

const StyledContent = styled(Dialog.Content, {
  display: 'flex',
  backgroundColor: '$offBlack',
  borderRadius: 26,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '720px',
  maxWidth: '100vw',
  maxHeight: '85vh',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`
  },
  '&:focus': { outline: 'none' }
});

const DialogTitle = styled(Dialog.Title, {
  margin: 0,
  color: '$white',
  fontSize: '24px',
  letterSpacing: '$normal'
});

const ConnectorButton = styled('button', {
  width: '100%',
  px: '$6',
  py: '$4',
  color: '$white',
  borderRadius: '$sm',
  gap: '16px',
  backgroundColor: 'transparent',
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, .05)'
  }
});

const walletIcons: any = {
  rainbow: '/icons/rainbow.png',
  injected: '/icons/metamask.png',
  coinbaseWallet: '/icons/coinbase.png',
  walletConnect: '/icons/walletconnect.png'
};

function DisconnectedWalletScene({ onConnect }: { onConnect: (connector: Connector) => void }) {
  const { connectors } = useConnect();
  return (
    <Box css={{ display: 'flex', width: '100%' }}>
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          padding: '$3',
          borderRight: '1px solid $border'
        }}>
        {connectors.map((connector) => (
          <Box key={connector.name} css={{ display: 'flex' }}>
            <ConnectorButton
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => onConnect(connector)}>
              <Box css={{ position: 'relative', width: 32, height: 32 }}>
                <Image layout="fill" src={walletIcons[connector.id]} />
              </Box>
              {connector.name}
              {!connector.ready && ' (unsupported)'}
            </ConnectorButton>
          </Box>
        ))}
      </Box>
      <Box css={{ display: 'flex', py: 32, px: 40, flex: 1 }}>
        <Box
          css={{
            maxWidth: '100%',
            width: '100%',
            height: '280px',
            borderRadius: 20,
            backgroundColor: '$white'
          }}></Box>
      </Box>
    </Box>
  );
}

function ConnectedWalletScene({ onDisconnect }: { onDisconnect: () => void }) {
  return (
    <Box css={{ display: 'flex', width: '100%', padding: '12px', flexDirection: 'column' }}>
      <ConnectorButton>
        <Box
          css={{
            px: '8px',
            py: '8px',
            borderRadius: '$sm',
            backgroundColor: '$border',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <DuplicateIcon width={24} height={24} />
        </Box>
        Copy address
      </ConnectorButton>
      <ConnectorButton onClick={onDisconnect}>
        <Box
          css={{
            px: '8px',
            py: '8px',
            borderRadius: '$sm',
            backgroundColor: '$border',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <LogoutIcon width={24} height={24} />
        </Box>
        Disconnect wallet
      </ConnectorButton>
    </Box>
  );
}

export function ConnectWalletModal({
  onClose,
  ...otherProps
}: { onClose: () => void } & Dialog.DialogProps) {
  const [ensOrAddress, setEnsOrAddress] = useState(null);
  const { login, logout, walletAddress } = useUserContext();
  const { data: ensName } = useEnsName({
    address: walletAddress
  });

  function onConnect(connector: Connector) {
    login(connector);
    onClose();
  }

  function onDisconnect() {
    logout();
    onClose();
  }

  useEffect(() => {
    if (ensName || walletAddress) {
      setEnsOrAddress(ensName || truncateAddress(walletAddress));
    }
  }, [ensName, walletAddress]);

  return (
    <Dialog.Root {...otherProps}>
      <Dialog.Portal>
        <StyledOverlay onClick={onClose} />
        <StyledContent
          css={{
            width: walletAddress ? '372px' : '720px'
          }}>
          <Box css={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box
              css={{
                padding: '$9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid $border'
              }}>
              {walletAddress ? (
                <DialogTitle>{ensOrAddress}</DialogTitle>
              ) : (
                <DialogTitle>Connect your Wallet</DialogTitle>
              )}
              <BaseButton
                onClick={onClose}
                css={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  borderRadius: '$md',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '$white'
                }}>
                <XIcon width={16} height={16} color="#000" />
              </BaseButton>
            </Box>
            {walletAddress ? (
              <ConnectedWalletScene onDisconnect={onDisconnect} />
            ) : (
              <DisconnectedWalletScene onConnect={onConnect} />
            )}
          </Box>
          <Dialog.Close />
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
