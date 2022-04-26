import { useMutation, UseMutationOptions } from 'react-query';

import { api } from '@lib/axios';

export function useMutationLogout(options: UseMutationOptions = {}) {
  async function fetcher() {
    const { data } = await api({
      method: 'DELETE',
      url: `/auth/logout`
    });

    return data;
  }

  return useMutation<{ ok: boolean }, Error>(fetcher, options);
}
