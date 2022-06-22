import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';

import { api } from '@lib/axios';

export function useMutationLogout(options: UseMutationOptions = {}) {
  const queryClient = useQueryClient();
  async function fetcher() {
    const { data } = await api({
      method: 'DELETE',
      url: `/auth/logout`
    });

    return data;
  }

  return useMutation<{ ok: boolean }, Error>(fetcher, {
    onSuccess: (...args) => {
      if (options?.onSuccess) options.onSuccess(...args);
      queryClient.setQueryData(['useQueryUserData'], null);
    },
    ...options
  });
}
