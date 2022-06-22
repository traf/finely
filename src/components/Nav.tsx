import Link from 'next/link';
import { useEnsName } from 'wagmi';
import { styled } from '@root/stitches.config';
import React, { useEffect, useState } from 'react';

// icons
import Logo from './Logo';
import IconETH from './IconETH';

// components
import { ConnectWalletModal } from './ConnectWalletModal';

// queries
import { truncateAddress } from '../helpers/truncateAddress';
import { useUserContext } from '../context/UserContext';
import { ConnectButton } from './ConnectButton';

const PortalsLink = styled('a', {
  fontSize: 18,
  color: '$grey',
  cursor: 'pointer',
  '&hover': { color: '$white' }
});

export function Nav() {
  const [connectWalletText, setConnectWalletText] = useState('Connect');
  const { walletAddress } = useUserContext();
  const { data: ensName } = useEnsName({
    address: walletAddress
  });

  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  useEffect(() => {
    setConnectWalletText(
      ensName ? ensName : walletAddress ? truncateAddress(walletAddress) : 'Connect'
    );
  }, [ensName, walletAddress]);

  return (
    <>
      <nav className="nav">
        <div className="container">
          <Logo />
          <div className="nav-links">
            <Link href="/account">Portals</Link>
            <Link href="/">Guides</Link>
            <ConnectButton />
            {/* <button className="button small" onClick={() => setIsConnectModalOpen(true)}>
              <IconETH /> {connectWalletText}
            </button> */}
          </div>
        </div>
      </nav>
      <ConnectWalletModal open={isConnectModalOpen} onClose={() => setIsConnectModalOpen(false)} />
    </>
  );
}
