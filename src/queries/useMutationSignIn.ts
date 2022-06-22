import { SiweMessage } from 'siwe';
import { MutationFunction, useMutation, UseMutationOptions } from 'react-query';

import { api } from '@lib/axios';

interface SignInMutationResponse {
  ok: boolean;
  walletAddress: string;
}

interface SignInMutationVariables {
  message: SiweMessage;
  signature: string;
}

export function useMutationSign(
  options: UseMutationOptions<SignInMutationResponse, Error, SignInMutationVariables> = {}
) {
  async function fetcher({ message, signature }: SignInMutationVariables) {
    const res = await api({
      method: 'POST',
      url: `/auth/verify`,
      data: { message, signature }
    });
    return res.data as SignInMutationResponse;
  }

  return useMutation<SignInMutationResponse, Error, SignInMutationVariables>(fetcher, options);
}
