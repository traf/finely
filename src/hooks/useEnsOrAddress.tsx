import { useEnsName } from 'wagmi';
import { useEffect, useState } from 'react';

// helpers
import { truncateAddress } from '@helpers/truncateAddress';

// context
import { useUserContext } from '@root/src/context/UserContext';

export function useEnsOrAddress() {
  const [value, setValue] = useState('');
  const { walletAddress } = useUserContext();
  const { data: ensName } = useEnsName({
    address: walletAddress
  });

  useEffect(() => {
    setValue(ensName ? ensName : walletAddress ? truncateAddress(walletAddress) : 'Connect');
  }, [ensName, walletAddress]);

  return value;
}
