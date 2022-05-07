import * as Dialog from '@radix-ui/react-dialog';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { styled, keyframes } from '@root/stitches.config';

// icons
import XIcon from '@heroicons/react/outline/XIcon';
import { BaseButton, Box, Button } from '@components/core';

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
  width: 'auto',
  maxWidth: '75vw',
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

const ConnectorButton = styled(Button, {
  width: '100%',
  px: '$6',
  py: '$4',
  color: '$white',
  borderRadius: '$sm',
  backgroundColor: '$transparent',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, .05)'
  }
});

export function ConnectWalletModal({
  onClose,
  ...otherProps
}: { onClose: () => void } & Dialog.DialogProps) {
  const { disconnect } = useDisconnect();
  const { data: connectData, connect, connectors } = useConnect();
  const { data: accountData } = useAccount();

  return (
    <Dialog.Root {...otherProps}>
      <Dialog.Portal>
        <StyledOverlay onClick={onClose} />
        <StyledContent>
          <Box css={{ width: '100%' }}>
            <Box
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '$9',
                borderBottom: '1px solid $border'
              }}>
              <DialogTitle>Connect your Wallet</DialogTitle>
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
            <Box css={{ display: 'flex', width: '100%' }}>
              <Box
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '$3',
                  borderRight: '1px solid $border'
                }}>
                {connectors.map((connector) => (
                  <Box key={connector.name}>
                    <ConnectorButton
                      disabled={!connector.ready}
                      key={connector.id}
                      onClick={() => connect(connector)}>
                      {connector.name}
                      {!connector.ready && ' (unsupported)'}
                    </ConnectorButton>
                  </Box>
                ))}
                <Box>
                  <ConnectorButton onClick={() => disconnect()}>Disconnect</ConnectorButton>
                </Box>
              </Box>
              <Box css={{ display: 'flex', py: 32, px: 40, flex: 1 }}>
                <Box
                  css={{
                    width: '280px',
                    height: '280px',
                    borderRadius: 20,
                    backgroundColor: '$white'
                  }}></Box>
              </Box>
            </Box>
          </Box>
          <Dialog.Close />
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
