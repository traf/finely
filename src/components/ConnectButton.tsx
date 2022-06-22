import { ConnectButton as RainbowKitConnectButton } from '@rainbow-me/rainbowkit';

// icons
import IconETH from './IconETH';

// components
import { Box, Button } from './core';

export function ConnectButton() {
  return (
    <RainbowKitConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
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
              if (!mounted || !account || !chain) {
                return (
                  <Button color="secondary" onClick={openConnectModal}>
                    Connect
                    <IconETH />
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button color="secondary" onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }

              return (
                <Button color="secondary" onClick={openAccountModal}>
                  {account.displayName}
                </Button>
              );
            })()}
          </Box>
        );
      }}
    </RainbowKitConnectButton.Custom>
  );
}
