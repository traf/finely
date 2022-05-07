import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAccount, useEnsName } from 'wagmi';
import { styled } from '@root/stitches.config';

// icons
import Logo from './Logo';
import IconETH from './IconETH';

// components
import { ConnectWalletModal } from './ConnectWalletModal';

// queries
import { useQueryUserData } from '../queries/useQueryUserData';
import { useMutationSign } from '../queries/useMutationSignIn';

const PortalsLink = styled('a', {
  fontSize: 18,
  color: '$grey',
  cursor: 'pointer',
  '&hover': { color: '$white' }
});

function truncateAddress(address: string) {
  return address.slice(0, 6) + '...' + address.slice(-4);
}

export function Nav() {
  const [connectWalletText, setConnectWalletText] = useState('Connect');
  const { data: userData, isLoading, isError } = useQueryUserData();
  const { data: accountData } = useAccount();
  const { data: ensName, isLoading: isENSLoading } = useEnsName({
    address: accountData?.address
  });
  const router = useRouter();
  const { mutate: logIn } = useMutationSign({
    onSuccess: ({ ok }) => {
      if (ok) {
        router.push('/portals');
      }
    }
  });
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  function goToPortals() {
    console.log({ userData, isLoading, isError });
    if (!userData) {
      return logIn();
    }

    router.push('/portals');
  }

  useEffect(() => {
    setConnectWalletText(
      ensName ? ensName : accountData?.address ? truncateAddress(accountData.address) : 'Connect'
    );
  }, [ensName, accountData?.address]);

  return (
    <>
      <nav className="nav">
        <div className="container">
          <Logo />
          <div className="nav-links">
            <PortalsLink onClick={goToPortals}>Portals</PortalsLink>
            <Link href="/">Guides</Link>
            <button className="button small" onClick={() => setIsConnectModalOpen(true)}>
              <IconETH /> {connectWalletText}
            </button>
          </div>
        </div>
      </nav>
      <ConnectWalletModal open={isConnectModalOpen} onClose={() => setIsConnectModalOpen(false)} />
    </>
  );
}
