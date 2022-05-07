import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';

import { api } from '@lib/axios';

export interface UserData {
  walletAddress: string;
}

export function useQueryUserData(options: UseQueryOptions<UserData, Error> = {}) {
  const queryClient = useQueryClient();
  async function fetcher() {
    const res = await api({
      method: 'GET',
      url: `auth/me`
    });
    return res.data;
  }

  return useQuery<UserData, Error>(['useQueryUserData'], fetcher, {
    retry: false,
    onError: () => {
      queryClient.setQueryData(['useQueryUserData'], null);
    },
    ...options
  });
}
