import { useQuery, UseQueryOptions } from 'react-query';

import { api } from '@lib/axios';

export function useQueryGetNonce(
  { walletAddress }: { walletAddress: string },
  options: UseQueryOptions<string, Error> = {}
) {
  async function fetcher() {
    const { data } = await api({
      method: 'GET',
      url: `/auth/nonce`
    });

    return data.nonce;
  }

  return useQuery<string, Error>(['useQueryGetNonce', walletAddress], fetcher, {
    ...options
  });
}
