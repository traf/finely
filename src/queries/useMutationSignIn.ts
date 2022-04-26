import { SiweMessage } from 'siwe';
import { useMutation, UseMutationOptions } from 'react-query';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';

import { api } from '@lib/axios';

interface SignInMutationResponse {
  ok: boolean;
  walletAddress: string;
}

function createMessage({
  nonce,
  address,
  chainId
}: {
  nonce: string;
  address: string;
  chainId: number;
}) {
  return new SiweMessage({
    nonce,
    address,
    chainId,
    version: '1',
    domain: window.location.host,
    uri: window.location.origin,
    statement: 'Sign in with Ethereum to the app.'
  });
}

export function useMutationSign(options: UseMutationOptions<SignInMutationResponse, Error> = {}) {
  const { data: accountData, error: accountError } = useAccount();
  const { activeChain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const chainId = activeChain?.id;
  const walletAddress = accountData?.address;

  async function fetcher() {
    const { data: nonceData } = await api({
      method: 'GET',
      url: `/auth/nonce`
    });

    const message = createMessage({ nonce: nonceData.nonce, address: walletAddress, chainId });

    let signature;
    try {
      signature = await signMessageAsync({ message: message.prepareMessage() });
    } catch (error) {
      throw new Error('Signature is empty');
    }

    const res = await api({
      method: 'POST',
      url: `/auth/verify`,
      data: { message, signature }
    });
    return res.data;
  }

  return useMutation<SignInMutationResponse, Error>(fetcher, options);
}
